import { SinonStubbedInstance } from 'sinon';
import { RepositorioCertificacion } from 'src/dominio/certificacion/puerto/repositorio/repositorio-certificacion';
import { ServicioEliminarCertificacion } from 'src/dominio/certificacion/servicio/servicio-eliminar-certificacion';
import { RepositorioExamen } from 'src/dominio/examen/puerto/repositorio/repositorio-examen';
import { createStubObj } from '../../../util/create-object.stub';

describe('ServicioEliminarCertificacion', () => {
  let servicioEliminarCertificacion: ServicioEliminarCertificacion;
  let repositorioCertificacionStub: SinonStubbedInstance<RepositorioCertificacion>;
  let repositorioExamenStub: SinonStubbedInstance<RepositorioExamen>;

  beforeEach(() => {
    repositorioCertificacionStub = createStubObj<RepositorioCertificacion>([
      'eliminar',
    ]);
    repositorioExamenStub = createStubObj<RepositorioExamen>([
      'existeCertificacionEnExamenesPorCertificacionId',
    ]);
    servicioEliminarCertificacion = new ServicioEliminarCertificacion(
      repositorioCertificacionStub,
      repositorioExamenStub
    );
  });

  it('si la certificación está asociada con un examen deberia no eliminar la certificacion', async () => {
    // Arrange
    repositorioExamenStub.existeCertificacionEnExamenesPorCertificacionId.returns(
      Promise.resolve(true)
    );
    const certificacionId = 1;

    // Act - Assert
    await expect(
      servicioEliminarCertificacion.ejecutar(certificacionId)
    ).rejects.toThrow(
      `No se puede eliminar la certificación ${certificacionId} porque está asociada a exámenes`
    );
  });

  it('si la certificación no está asociada con un examen deberia eliminar la certificacion', async () => {
    // Arrange
    repositorioExamenStub.existeCertificacionEnExamenesPorCertificacionId.returns(
      Promise.resolve(false)
    );
    const certificacionId = 1;

    // Act
    await servicioEliminarCertificacion.ejecutar(certificacionId);

    // Assert
    expect(repositorioCertificacionStub.eliminar.getCalls().length).toBe(1);
    expect(
      repositorioCertificacionStub.eliminar.calledWith(certificacionId)
    ).toBeTruthy();
  });
});
