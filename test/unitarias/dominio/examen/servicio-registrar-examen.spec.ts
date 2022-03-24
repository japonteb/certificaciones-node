import { ExamenTestDataBuilder } from './builder/examen-test-data-builder';
import { ServicioRegistrarExamen } from 'src/dominio/examen/servicio/servicio-registrar-examen';
import { Examen } from 'src/dominio/examen/modelo/examen';
import { RepositorioExamen } from 'src/dominio/examen/puerto/repositorio/repositorio-examen';
import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';

describe('ServicioRegistrarExamen', () => {
  let servicioRegistrarExamen: ServicioRegistrarExamen;
  let repositorioExamenStub: SinonStubbedInstance<RepositorioExamen>;

  beforeEach(() => {
    repositorioExamenStub = createStubObj<RepositorioExamen>([
      'existe',
      'guardar',
    ]);
    servicioRegistrarExamen = new ServicioRegistrarExamen(
      repositorioExamenStub
    );
  });

  it('si ya existe un examen programado para el cliente y certificacion no se puede crear y deberia retonar error', async () => {
    // Arrange
    repositorioExamenStub.existe.returns(Promise.resolve(true));
    const examen: Examen = new ExamenTestDataBuilder().build();

    // Act - Assert
    await expect(servicioRegistrarExamen.ejecutar(examen)).rejects.toThrow(
      `El examen ya está programado en el sistema`
    );
  });

  it('si no existe un examen programado para el cliente y certificacion no se puede crear y deberia guardar el examen en el repositorio', async () => {
    // Arrange
    repositorioExamenStub.existe.returns(Promise.resolve(false));
    const examen: Examen = new ExamenTestDataBuilder().build();

    // Act
    await servicioRegistrarExamen.ejecutar(examen);

    // Assert
    expect(repositorioExamenStub.guardar.getCalls().length).toBe(1);
    expect(repositorioExamenStub.guardar.calledWith(examen)).toBeTruthy();
  });
});
