import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { ManejadorListarCliente } from 'src/aplicacion/cliente/consulta/listar-clientes.manejador';
import { ManejadorObtenerClientePorId } from 'src/aplicacion/cliente/consulta/obtener-cliente-por-id.manejador';
import { DaoCliente } from 'src/dominio/cliente/puerto/dao/dao-cliente';
import { ClienteControlador } from 'src/infraestructura/cliente/controlador/cliente.controlador';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import * as request from 'supertest';
import { createStubObj } from '../../../util/create-object.stub';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de clientes', () => {
  let app: INestApplication;
  let daoCliente: SinonStubbedInstance<DaoCliente>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    daoCliente = createStubObj<DaoCliente>(
      ['listar', 'obtenerCliente'],
      sinonSandbox
    );
    const moduleRef = await Test.createTestingModule({
      controllers: [ClienteControlador],
      providers: [
        AppLogger,
        { provide: DaoCliente, useValue: daoCliente },
        ManejadorListarCliente,
        ManejadorObtenerClientePorId,
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

  it('debería listar las clientes registrados', () => {
    // Arrange
    const clientes: any[] = [
      {
        id: 1,
        nombre: 'William',
        tipoCliente: 4,
      },
    ];
    daoCliente.listar.returns(Promise.resolve(clientes));

    // Act - Assert
    return request(app.getHttpServer())
      .get('/clientes')
      .expect(HttpStatus.OK)
      .expect(clientes);
  });

  it('debería listar cliente por id', () => {
    // Arrange
    const clienteId = 1;
    const cliente: any = {
      id: 1,
      nombre: 'William',
      tipoCliente: 4,
    };
    daoCliente.obtenerCliente.returns(Promise.resolve(cliente));

    // Act - Assert
    return request(app.getHttpServer())
      .get(`/clientes/${clienteId}`)
      .expect(HttpStatus.OK)
      .expect(cliente);
  });
});
