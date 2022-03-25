import { ErrorCodigoClienteInvalido } from 'src/dominio/errores/error-codigo-cliente-invalido';

export class EnumeracionTipoCliente {
  static readonly CODIGO_CLIENTE_TIPO_1 = 1;
  static readonly CODIGO_CLIENTE_TIPO_2 = 2;
  static readonly CODIGO_CLIENTE_TIPO_3 = 3;
  static readonly CODIGO_CLIENTE_TIPO_4 = 4;

  static readonly PORCENTAJE_DESCUENTO_TIPO_1 = 10;
  static readonly PORCENTAJE_DESCUENTO_TIPO_2 = 20;
  static readonly PORCENTAJE_DESCUENTO_TIPO_3 = 30;
  static readonly PORCENTAJE_DESCUENTO_TIPO_4 = 0;

  public static readonly CLIENTE_TIPO_1 = new EnumeracionTipoCliente(
    EnumeracionTipoCliente.CODIGO_CLIENTE_TIPO_1,
    EnumeracionTipoCliente.PORCENTAJE_DESCUENTO_TIPO_1
  );
  public static readonly CLIENTE_TIPO_2 = new EnumeracionTipoCliente(
    EnumeracionTipoCliente.CODIGO_CLIENTE_TIPO_2,
    EnumeracionTipoCliente.PORCENTAJE_DESCUENTO_TIPO_2
  );
  public static readonly CLIENTE_TIPO_3 = new EnumeracionTipoCliente(
    EnumeracionTipoCliente.CODIGO_CLIENTE_TIPO_3,
    EnumeracionTipoCliente.PORCENTAJE_DESCUENTO_TIPO_3
  );
  public static readonly CLIENTE_TIPO_4 = new EnumeracionTipoCliente(
    EnumeracionTipoCliente.CODIGO_CLIENTE_TIPO_4,
    EnumeracionTipoCliente.PORCENTAJE_DESCUENTO_TIPO_4
  );

  public static readonly CODIGO_TIPO_DE_CLIENTE_INVALIDO: string =
    'El código del tipo de cliente es inválido';

  private constructor(
    public readonly codigoTipoCliente: number,
    public readonly porcentajeDescuento: number
  ) {}

  public static obtenerEnumeracionTipoClienteDeCodigo(
    codigoTipoCliente: number
  ) {
    if (
      EnumeracionTipoCliente.CLIENTE_TIPO_1.codigoTipoCliente ===
      codigoTipoCliente
    ) {
      return EnumeracionTipoCliente.CLIENTE_TIPO_1;
    } else if (
      EnumeracionTipoCliente.CLIENTE_TIPO_2.codigoTipoCliente ===
      codigoTipoCliente
    ) {
      return EnumeracionTipoCliente.CLIENTE_TIPO_2;
    } else if (
      EnumeracionTipoCliente.CLIENTE_TIPO_3.codigoTipoCliente ===
      codigoTipoCliente
    ) {
      return EnumeracionTipoCliente.CLIENTE_TIPO_3;
    } else if (
      EnumeracionTipoCliente.CLIENTE_TIPO_4.codigoTipoCliente ===
      codigoTipoCliente
    ) {
      return EnumeracionTipoCliente.CLIENTE_TIPO_4;
    }

    throw new ErrorCodigoClienteInvalido(
      EnumeracionTipoCliente.CODIGO_TIPO_DE_CLIENTE_INVALIDO
    );
  }
}
