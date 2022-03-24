import { CertificacionTestDataBuilder } from './builder/certificacion-test-data-builder';
import { ServicioRegistrarCertificacion } from 'src/dominio/certificacion/servicio/servicio-registrar-certificacion';
import { Certificacion } from 'src/dominio/certificacion/modelo/certificacion';
import { RepositorioCertificacion } from 'src/dominio/certificacion/puerto/repositorio/repositorio-certificacion';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';

describe('ServicioRegistrarCertificacion', () => {
  let servicioRegistrarCertificacion: ServicioRegistrarCertificacion;
  let repositorioCertificacionStub: SinonStubbedInstance<RepositorioCertificacion>;

  beforeEach(() => {
    repositorioCertificacionStub = createStubObj<RepositorioCertificacion>([
      'existePorNombreYDetalle',
      'guardar',
    ]);
    servicioRegistrarCertificacion = new ServicioRegistrarCertificacion(
      repositorioCertificacionStub
    );
  });

  it('si ya existe una certificación con el nombre y detalle entonces no se puede crear y deberia retonar error', async () => {
    // Arrange
    repositorioCertificacionStub.existePorNombreYDetalle.returns(
      Promise.resolve(true)
    );
    const certificacion: Certificacion =
      new CertificacionTestDataBuilder().build();

    // Act - Assert
    await expect(
      servicioRegistrarCertificacion.ejecutar(certificacion)
    ).rejects.toThrow(
      `La certificación con nombre ${certificacion.nombre} y detalle ${certificacion.detalle} ya existe en el sistema`
    );
  });

  it('si no existe una certificacion con el nombre y detalle deberia guardar la certificacion en el repositorio', async () => {
    // Arrange
    repositorioCertificacionStub.existePorNombreYDetalle.returns(
      Promise.resolve(false)
    );
    const certificacion: Certificacion =
      new CertificacionTestDataBuilder().build();

    // Act
    await servicioRegistrarCertificacion.ejecutar(certificacion);

    // Assert
    expect(repositorioCertificacionStub.guardar.getCalls().length).toBe(1);
    expect(
      repositorioCertificacionStub.guardar.calledWith(certificacion)
    ).toBeTruthy();
  });
});
