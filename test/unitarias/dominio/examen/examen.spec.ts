import { ErrorFechaPosteriorAActual } from 'src/dominio/errores/error-fecha-posterior-a-actual';
import { ErrorValorRequerido } from 'src/dominio/errores/error-valor-requerido';
import { Examen } from 'src/dominio/examen/modelo/examen';
import { ExamenTestDataBuilder } from './builder/examen-test-data-builder';

describe('Examen', () => {
  it('examen sin cliente debería retornar error', () => {
    // Arrange
    const examenTestDataBuilder: ExamenTestDataBuilder =
      new ExamenTestDataBuilder().conCliente(null);

    // Act - Assert
    return expect(async () =>
      examenTestDataBuilder.build()
    ).rejects.toStrictEqual(
      new ErrorValorRequerido(
        'Se debe ingresar el cliente que va a presentar el examen'
      )
    );
  });

  it('examen sin certificación debería retornar error', () => {
    // Arrange
    const examenTestDataBuilder: ExamenTestDataBuilder =
      new ExamenTestDataBuilder().conCertificacion(null);

    // Act - Assert
    return expect(async () =>
      examenTestDataBuilder.build()
    ).rejects.toStrictEqual(
      new ErrorValorRequerido('Se debe ingresar la certificación del examen')
    );
  });

  it('examen sin fecha de presentación debería retornar error', () => {
    // Arrange
    const examenTestDataBuilder: ExamenTestDataBuilder =
      new ExamenTestDataBuilder().conFechaPresentacion(null);

    // Act - Assert
    return expect(async () =>
      examenTestDataBuilder.build()
    ).rejects.toStrictEqual(
      new ErrorValorRequerido(
        'Se debe ingresar la fecha de presentación del examen'
      )
    );
  });

  it('examen con fecha de presentación anterior a la fecha actual debería retornar error', () => {
    // Arrange
    const fechaPresentacionAnterior = '2021-04-23T19:30:00.000Z';
    const examenTestDataBuilder: ExamenTestDataBuilder =
      new ExamenTestDataBuilder().conFechaPresentacion(
        fechaPresentacionAnterior
      );

    // Act - Assert
    return expect(async () =>
      examenTestDataBuilder.build()
    ).rejects.toStrictEqual(
      new ErrorFechaPosteriorAActual(
        'La fecha de presentación del examen no puede ser anterior a la fecha actual'
      )
    );
  });

  it('examen con cliente, certificación y fecha de presentación posterior a la actual debería crear bien', () => {
    // Arrange
    const fechaPresentacionActual: string = new Date(
      Date.now() + 3600 * 1000 * 24
    ).toISOString();
    const examenTestDataBuilder: ExamenTestDataBuilder =
      new ExamenTestDataBuilder().conFechaPresentacion(fechaPresentacionActual);

    // Act
    const examen: Examen = examenTestDataBuilder.build();

    // Assert
    expect(examen.certificacion.nombre).toEqual('Java');
    expect(examen.cliente.nombre).toEqual('William');
    expect(examen.fechaPresentacion.toISOString()).toEqual(
      fechaPresentacionActual
    );
  });
});
