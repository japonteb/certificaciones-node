import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { ManejadorRegistrarExamen } from 'src/aplicacion/examen/comando/registrar-examen.manejador';
import { DaoExamen } from 'src/dominio/examen/puerto/dao/dao-examen';
import { ServicioRegistrarExamen } from 'src/dominio/examen/servicio/servicio-registrar-examen';
import { RepositorioExamen } from 'src/dominio/examen/puerto/repositorio/repositorio-examen';
import { ExamenControlador } from 'src/infraestructura/examen/controlador/examen.controlador';
import { servicioRegistrarExamenProveedor } from 'src/infraestructura/examen/proveedor/servicio/servicio-registrar-examen.proveedor';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import * as request from 'supertest';
import { createStubObj } from '../../../util/create-object.stub';
import { ExamenComandoTestDataBuilder } from '../builder/examen-comando-test-data-builder';
import { ManejadorListarExamenPorCliente } from 'src/aplicacion/examen/consulta/listar-examenes-por-cliente.manejador';
import { ComandoRegistrarExamen } from 'src/aplicacion/examen/comando/registrar-examen.comando';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de examenes', () => {
  let app: INestApplication;
  let repositorioExamen: SinonStubbedInstance<RepositorioExamen>;
  let daoExamen: SinonStubbedInstance<DaoExamen>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioExamen = createStubObj<RepositorioExamen>(
      ['existe', 'guardar'],
      sinonSandbox
    );
    daoExamen = createStubObj<DaoExamen>(['listarPorClienteId'], sinonSandbox);
    const moduleRef = await Test.createTestingModule({
      controllers: [ExamenControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioRegistrarExamen,
          inject: [RepositorioExamen],
          useFactory: servicioRegistrarExamenProveedor,
        },
        {
          provide: RepositorioExamen,
          useValue: repositorioExamen,
        },
        { provide: DaoExamen, useValue: daoExamen },
        ManejadorRegistrarExamen,
        ManejadorListarExamenPorCliente,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    const logger = await app.resolve(AppLogger);
    logger.customError = sinonSandbox.stub();
    app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
    await app.init();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  afterAll(async () => {
    await app.close();
  });

  it('debería listar examenes por cliente por id', () => {
    // Arrange
    const clienteId = 1;
    // Arrange
    const examenes: any[] = [
      {
        id: 5,
        clienteId: 2,
        certificacionId: 5,
        fechaPresentacion: '2022-04-24T00:34:55.000Z',
        precioTotal: 126,
      },
    ];
    daoExamen.listarPorClienteId.returns(Promise.resolve(examenes));

    // Act - Assert
    return request(app.getHttpServer())
      .get(`/examenes/clientes/${clienteId}`)
      .expect(HttpStatus.OK)
      .expect(examenes);
  });

  it('debería fallar al registar un examen con un cliente y una certificacion ya existentes', async () => {
    // Arrange
    const examen: ComandoRegistrarExamen =
      new ExamenComandoTestDataBuilder().build();
    const mensaje = `El examen ya está programado en el sistema`;
    repositorioExamen.existe.returns(Promise.resolve(true));

    // Act - Assert
    const response = await request(app.getHttpServer())
      .post('/examenes')
      .send(examen)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
  });

  it('debería registar un examen con un cliente y una certificacion no existentes', async () => {
    // Arrange
    const examen: ComandoRegistrarExamen =
      new ExamenComandoTestDataBuilder().build();

    repositorioExamen.existe.returns(Promise.resolve(false));

    // Act
    const response = await request(app.getHttpServer())
      .post('/examenes')
      .send(examen);

    // Assert
    expect(response.statusCode).toBe(HttpStatus.CREATED);
  });
});
