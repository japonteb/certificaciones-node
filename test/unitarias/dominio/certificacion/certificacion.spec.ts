import { Certificacion } from 'src/dominio/certificacion/modelo/certificacion';
import { ErrorValorPositivo } from 'src/dominio/errores/error-valor-positivo';
import { ErrorValorRequerido } from 'src/dominio/errores/error-valor-requerido';
import { CertificacionTestDataBuilder } from './builder/certificacion-test-data-builder';

describe('Certificacion', () => {
  it('certificacion sin nombre debería retornar error', () => {
    // Arrange
    const certificacionTestDataBuilder: CertificacionTestDataBuilder =
      new CertificacionTestDataBuilder().conNombre(null);

    // Act - Assert
    return expect(async () =>
      certificacionTestDataBuilder.build()
    ).rejects.toStrictEqual(
      new ErrorValorRequerido('Se debe ingresar el nombre de la certificación')
    );
  });

  it('certificacion sin detalle debería retornar error', () => {
    // Arrange
    const certificacionTestDataBuilder: CertificacionTestDataBuilder =
      new CertificacionTestDataBuilder().conDetalle(null);

    // Act - Assert
    return expect(async () =>
      certificacionTestDataBuilder.build()
    ).rejects.toStrictEqual(
      new ErrorValorRequerido('Se debe ingresar el detalle de la certificación')
    );
  });

  it('certificacion sin duracion debería retornar error', () => {
    // Arrange
    const certificacionTestDataBuilder: CertificacionTestDataBuilder =
      new CertificacionTestDataBuilder().conDuracion(null);

    // Act - Assert
    return expect(async () =>
      certificacionTestDataBuilder.build()
    ).rejects.toStrictEqual(
      new ErrorValorRequerido(
        'Se debe ingresar la duración en horas de la certificación'
      )
    );
  });

  it('certificacion sin precio debería retornar error', () => {
    // Arrange
    const certificacionTestDataBuilder: CertificacionTestDataBuilder =
      new CertificacionTestDataBuilder().conPrecio(null);

    // Act - Assert
    return expect(async () =>
      certificacionTestDataBuilder.build()
    ).rejects.toStrictEqual(
      new ErrorValorRequerido('Se debe ingresar el precio de la certificación')
    );
  });

  it('certificacion con duración negativa debería retornar error', () => {
    // Arrange
    const certificacionTestDataBuilder: CertificacionTestDataBuilder =
      new CertificacionTestDataBuilder().conDuracion(-120);

    // Act - Assert
    return expect(async () =>
      certificacionTestDataBuilder.build()
    ).rejects.toStrictEqual(
      new ErrorValorPositivo(
        'La duración de la certificación debe ser mayor a cero'
      )
    );
  });

  it('certificacion con duración cero debería retornar error', () => {
    // Arrange
    const certificacionTestDataBuilder: CertificacionTestDataBuilder =
      new CertificacionTestDataBuilder().conDuracion(0);

    // Act - Assert
    return expect(async () =>
      certificacionTestDataBuilder.build()
    ).rejects.toStrictEqual(
      new ErrorValorPositivo(
        'La duración de la certificación debe ser mayor a cero'
      )
    );
  });

  it('certificacion con precio negativo debería retornar error', () => {
    // Arrange
    const certificacionTestDataBuilder: CertificacionTestDataBuilder =
      new CertificacionTestDataBuilder().conPrecio(-1000);

    // Act - Assert
    return expect(async () =>
      certificacionTestDataBuilder.build()
    ).rejects.toStrictEqual(
      new ErrorValorPositivo(
        'El precio de la certificación debe ser mayor a cero'
      )
    );
  });

  it('certificacion con precio cero debería retornar error', () => {
    // Arrange
    const certificacionTestDataBuilder: CertificacionTestDataBuilder =
      new CertificacionTestDataBuilder().conPrecio(0);

    // Act - Assert
    return expect(async () =>
      certificacionTestDataBuilder.build()
    ).rejects.toStrictEqual(
      new ErrorValorPositivo(
        'El precio de la certificación debe ser mayor a cero'
      )
    );
  });

  it('certificacion con nombre, detalle, duración y precio debería crear bien', () => {
    // Arrange
    const certificacionTestDataBuilder: CertificacionTestDataBuilder =
      new CertificacionTestDataBuilder();

    // Act
    const certificacion: Certificacion = certificacionTestDataBuilder.build();

    // Assert
    expect(certificacion.nombre).toEqual('Java');
    expect(certificacion.detalle).toEqual('Java EE y Servicios Web');
    expect(certificacion.duracion).toEqual(120);
    expect(certificacion.precio).toEqual(1000);
  });
});
