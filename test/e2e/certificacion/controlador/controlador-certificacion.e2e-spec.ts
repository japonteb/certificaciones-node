import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import { ComandoCertificacion } from 'src/aplicacion/certificacion/comando/certificacion.comando';
import { ManejadorEliminarCertificacion } from 'src/aplicacion/certificacion/comando/eliminar-certificacion.manejador';
import { ManejadorRegistrarCertificacion } from 'src/aplicacion/certificacion/comando/registrar-certificacion.manejador';
import { ManejadorListarCertificacion } from 'src/aplicacion/certificacion/consulta/listar-certificaciones.manejador';
import { DaoCertificacion } from 'src/dominio/certificacion/puerto/dao/dao-certificacion';
import { RepositorioCertificacion } from 'src/dominio/certificacion/puerto/repositorio/repositorio-certificacion';
import { ServicioEliminarCertificacion } from 'src/dominio/certificacion/servicio/servicio-eliminar-certificacion';
import { ServicioRegistrarCertificacion } from 'src/dominio/certificacion/servicio/servicio-registrar-certificacion';
import { RepositorioExamen } from 'src/dominio/examen/puerto/repositorio/repositorio-examen';
import { CertificacionControlador } from 'src/infraestructura/certificacion/controlador/certificacion.controlador';
import { servicioEliminarCertificacionProveedor } from 'src/infraestructura/certificacion/proveedor/servicio/servicio-eliminar-certificacion.proveedor';
import { servicioRegistrarCertificacionProveedor } from 'src/infraestructura/certificacion/proveedor/servicio/servicio-registrar-certificacion.proveedor';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import * as request from 'supertest';
import { createStubObj } from '../../../util/create-object.stub';

/**
 * Un sandbox es util cuando el módulo de nest se configura una sola vez durante el ciclo completo de pruebas
 * */
const sinonSandbox = createSandbox();

describe('Pruebas al controlador de certificaciones', () => {
  let app: INestApplication;
  let repositorioCertificacion: SinonStubbedInstance<RepositorioCertificacion>;
  let repositorioExamen: SinonStubbedInstance<RepositorioExamen>;
  let daoCertificacion: SinonStubbedInstance<DaoCertificacion>;

  /**
   * No Inyectar los módulos completos (Se trae TypeORM y genera lentitud al levantar la prueba, traer una por una las dependencias)
   **/
  beforeAll(async () => {
    repositorioCertificacion = createStubObj<RepositorioCertificacion>(
      ['existePorNombreYDetalle', 'guardar', 'eliminar'],
      sinonSandbox
    );
    repositorioExamen = createStubObj<RepositorioExamen>(
      ['existeCertificacionEnExamenesPorCertificacionId'],
      sinonSandbox
    );
    daoCertificacion = createStubObj<DaoCertificacion>(
      ['listar'],
      sinonSandbox
    );
    const moduleRef = await Test.createTestingModule({
      controllers: [CertificacionControlador],
      providers: [
        AppLogger,
        {
          provide: ServicioRegistrarCertificacion,
          inject: [RepositorioCertificacion],
          useFactory: servicioRegistrarCertificacionProveedor,
        },
        {
          provide: ServicioEliminarCertificacion,
          inject: [RepositorioCertificacion, RepositorioExamen],
          useFactory: servicioEliminarCertificacionProveedor,
        },
        {
          provide: RepositorioCertificacion,
          useValue: repositorioCertificacion,
        },
        {
          provide: RepositorioExamen,
          useValue: repositorioExamen,
        },
        { provide: DaoCertificacion, useValue: daoCertificacion },
        ManejadorRegistrarCertificacion,
        ManejadorEliminarCertificacion,
        ManejadorListarCertificacion,
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

  it('debería listar las certificaciones registrados', () => {
    // Arrange
    const certificaciones: any[] = [
      {
        id: 1,
        nombre: 'Java',
        detalle: 'Java EE y Servicios Web',
        duracion: 120,
        precio: 1000,
      },
    ];
    daoCertificacion.listar.returns(Promise.resolve(certificaciones));

    // Act - Assert
    return request(app.getHttpServer())
      .get('/certificaciones')
      .expect(HttpStatus.OK)
      .expect(certificaciones);
  });

  it('debería fallar al registar un certificacion con un nombre y detalle ya existente', async () => {
    const certificacion: ComandoCertificacion = {
      id: 1,
      nombre: 'Java',
      detalle: 'Java EE y Servicios Web',
      duracion: 120,
      precio: 1000,
    };
    const mensaje = `La certificación con nombre ${certificacion.nombre} y detalle ${certificacion.detalle} ya existe en el sistema`;
    repositorioCertificacion.existePorNombreYDetalle.returns(
      Promise.resolve(true)
    );

    // Act - Assert
    const response = await request(app.getHttpServer())
      .post('/certificaciones')
      .send(certificacion)
      .expect(HttpStatus.FORBIDDEN);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.status).toBe(HttpStatus.FORBIDDEN);
  });
});
