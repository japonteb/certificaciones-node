import { ErrorFechaPosteriorAActual } from 'src/dominio/errores/error-fecha-posterior-a-actual';
import { ErrorValorRequerido } from 'src/dominio/errores/error-valor-requerido';
import { Examen } from 'src/dominio/examen/modelo/examen';
import { CertificacionTestDataBuilder } from '../certificacion/builder/certificacion-test-data-builder';
import { ClienteTestDataBuilder } from '../cliente/builder/cliente-test-data-builder';
import { ExamenTestDataBuilder } from './builder/examen-test-data-builder';

describe('Examen', () => {
  let fechaPresentacionEntreSemana: string;
  let fechaPresentacionFinDeSemana: string;
  let fechaPresentacionFestivo: string;
  let examenTestDataBuilderConCertificacionPrecio100: ExamenTestDataBuilder;
  let examenTestDataBuilderConClienteTipo1ConCertificacionPrecio100: ExamenTestDataBuilder;
  let examenTestDataBuilderConClienteTipo2ConCertificacionPrecio100: ExamenTestDataBuilder;
  let examenTestDataBuilderConClienteTipo3ConCertificacionPrecio100: ExamenTestDataBuilder;
  let examenTestDataBuilderConClienteTipo4ConCertificacionPrecio100: ExamenTestDataBuilder;

  beforeAll(() => {
    fechaPresentacionEntreSemana = new Date(
      Date.UTC(2022, 3, 27, 13, 0, 0)
    ).toISOString();
    fechaPresentacionFinDeSemana = new Date(
      Date.UTC(2022, 3, 30, 13, 0, 0)
    ).toISOString();
    fechaPresentacionFestivo = new Date(
      Date.UTC(2022, 11, 25, 13, 0, 0)
    ).toISOString();

    examenTestDataBuilderConCertificacionPrecio100 =
      new ExamenTestDataBuilder().conCertificacion(
        new CertificacionTestDataBuilder().conPrecio(100).build()
      );

    examenTestDataBuilderConClienteTipo1ConCertificacionPrecio100 =
      examenTestDataBuilderConCertificacionPrecio100
        .pero()
        .conCliente(
          new ClienteTestDataBuilder().conCodigoTipoCliente(1).build()
        );

    examenTestDataBuilderConClienteTipo2ConCertificacionPrecio100 =
      examenTestDataBuilderConCertificacionPrecio100
        .pero()
        .conCliente(
          new ClienteTestDataBuilder().conCodigoTipoCliente(2).build()
        );

    examenTestDataBuilderConClienteTipo3ConCertificacionPrecio100 =
      examenTestDataBuilderConCertificacionPrecio100
        .pero()
        .conCliente(
          new ClienteTestDataBuilder().conCodigoTipoCliente(3).build()
        );

    examenTestDataBuilderConClienteTipo4ConCertificacionPrecio100 =
      examenTestDataBuilderConCertificacionPrecio100
        .pero()
        .conCliente(
          new ClienteTestDataBuilder().conCodigoTipoCliente(4).build()
        );
  });

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

  it('deberia calcular precio con descuento cliente tipo 1 dia entre semana', () => {
    // Arrange - act
    const PRECIO_ENTRE_SEMANA_CON_10_PORCIENTO__DE_DESCUENTO = 90;
    const examen: Examen =
      examenTestDataBuilderConClienteTipo1ConCertificacionPrecio100
        .conFechaPresentacion(fechaPresentacionEntreSemana)
        .build();
    // assert
    expect(examen.precioTotal).toEqual(
      PRECIO_ENTRE_SEMANA_CON_10_PORCIENTO__DE_DESCUENTO
    );
  });

  it('deberia calcular precio con descuento cliente tipo 1 dia fin de semana', () => {
    // Arrange - act
    const PRECIO_FIN_DE_SEMANA_CON_10_PORCIENTO__DE_DESCUENTO = 180;
    const examen: Examen =
      examenTestDataBuilderConClienteTipo1ConCertificacionPrecio100
        .conFechaPresentacion(fechaPresentacionFinDeSemana)
        .build();
    // assert
    expect(examen.precioTotal).toEqual(
      PRECIO_FIN_DE_SEMANA_CON_10_PORCIENTO__DE_DESCUENTO
    );
  });

  it('deberia calcular precio con descuento cliente tipo 1 festivo', () => {
    // Arrange - act
    const PRECIO_FESTIVO_CON_10_PORCIENTO__DE_DESCUENTO = 270;
    const examen: Examen =
      examenTestDataBuilderConClienteTipo1ConCertificacionPrecio100
        .conFechaPresentacion(fechaPresentacionFestivo)
        .build();
    // assert
    expect(examen.precioTotal).toEqual(
      PRECIO_FESTIVO_CON_10_PORCIENTO__DE_DESCUENTO
    );
  });

  it('deberia calcular precio con descuento cliente tipo 2 dia entre semana', () => {
    // Arrange - act
    const PRECIO_ENTRE_SEMANA_CON_20_PORCIENTO__DE_DESCUENTO = 80;
    const examen: Examen =
      examenTestDataBuilderConClienteTipo2ConCertificacionPrecio100
        .conFechaPresentacion(fechaPresentacionEntreSemana)
        .build();
    // assert
    expect(examen.precioTotal).toEqual(
      PRECIO_ENTRE_SEMANA_CON_20_PORCIENTO__DE_DESCUENTO
    );
  });

  it('deberia calcular precio con descuento cliente tipo 2 dia fin de semana', () => {
    // Arrange - act
    const PRECIO_FIN_DE_SEMANA_CON_20_PORCIENTO__DE_DESCUENTO = 160;
    const examen: Examen =
      examenTestDataBuilderConClienteTipo2ConCertificacionPrecio100
        .conFechaPresentacion(fechaPresentacionFinDeSemana)
        .build();
    // assert
    expect(examen.precioTotal).toEqual(
      PRECIO_FIN_DE_SEMANA_CON_20_PORCIENTO__DE_DESCUENTO
    );
  });

  it('deberia calcular precio con descuento cliente tipo 2 festivo', () => {
    // Arrange - act
    const PRECIO_FESTIVO_CON_20_PORCIENTO__DE_DESCUENTO = 240;
    const examen: Examen =
      examenTestDataBuilderConClienteTipo2ConCertificacionPrecio100
        .conFechaPresentacion(fechaPresentacionFestivo)
        .build();
    // assert
    expect(examen.precioTotal).toEqual(
      PRECIO_FESTIVO_CON_20_PORCIENTO__DE_DESCUENTO
    );
  });

  it('deberia calcular precio con descuento cliente tipo 3 dia entre semana', () => {
    // Arrange - act
    const PRECIO_ENTRE_SEMANA_CON_30_PORCIENTO__DE_DESCUENTO = 70;
    const examen: Examen =
      examenTestDataBuilderConClienteTipo3ConCertificacionPrecio100
        .conFechaPresentacion(fechaPresentacionEntreSemana)
        .build();
    // assert
    expect(examen.precioTotal).toEqual(
      PRECIO_ENTRE_SEMANA_CON_30_PORCIENTO__DE_DESCUENTO
    );
  });

  it('deberia calcular precio con descuento cliente tipo 3 dia fin de semana', () => {
    // Arrange - act
    const PRECIO_FIN_DE_SEMANA_CON_30_PORCIENTO__DE_DESCUENTO = 140;
    const examen: Examen =
      examenTestDataBuilderConClienteTipo3ConCertificacionPrecio100
        .conFechaPresentacion(fechaPresentacionFinDeSemana)
        .build();
    // assert
    expect(examen.precioTotal).toEqual(
      PRECIO_FIN_DE_SEMANA_CON_30_PORCIENTO__DE_DESCUENTO
    );
  });

  it('deberia calcular precio con descuento cliente tipo 3 festivo', () => {
    // Arrange - act
    const PRECIO_FESTIVO_CON_30_PORCIENTO__DE_DESCUENTO = 210;
    const examen: Examen =
      examenTestDataBuilderConClienteTipo3ConCertificacionPrecio100
        .conFechaPresentacion(fechaPresentacionFestivo)
        .build();
    // assert
    expect(examen.precioTotal).toEqual(
      PRECIO_FESTIVO_CON_30_PORCIENTO__DE_DESCUENTO
    );
  });

  it('deberia calcular precio con descuento cliente tipo 4 dia entre semana', () => {
    // Arrange - act
    const PRECIO_ENTRE_SEMANA_SIN_DESCUENTO = 100;
    const examen: Examen =
      examenTestDataBuilderConClienteTipo4ConCertificacionPrecio100
        .conFechaPresentacion(fechaPresentacionEntreSemana)
        .build();
    // assert
    expect(examen.precioTotal).toEqual(PRECIO_ENTRE_SEMANA_SIN_DESCUENTO);
  });

  it('deberia calcular precio con descuento cliente tipo 4 dia fin de semana', () => {
    // Arrange - act
    const PRECIO_FIN_DE_SEMANA_SIN_DESCUENTO = 200;
    const examen: Examen =
      examenTestDataBuilderConClienteTipo4ConCertificacionPrecio100
        .conFechaPresentacion(fechaPresentacionFinDeSemana)
        .build();
    // assert
    expect(examen.precioTotal).toEqual(PRECIO_FIN_DE_SEMANA_SIN_DESCUENTO);
  });

  it('deberia calcular precio con descuento cliente tipo 4 festivo', () => {
    // Arrange - act
    const PRECIO_FESTIVO_SIN_DESCUENTO = 300;
    const examen: Examen =
      examenTestDataBuilderConClienteTipo4ConCertificacionPrecio100
        .conFechaPresentacion(fechaPresentacionFestivo)
        .build();
    // assert
    expect(examen.precioTotal).toEqual(PRECIO_FESTIVO_SIN_DESCUENTO);
  });
});
