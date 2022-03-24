import { ErrorCodigoClienteInvalido } from 'src/dominio/errores/error-codigo-cliente-invalido';

export class EnumeracionTipoCliente {
  public static readonly CLIENTE_TIPO_1 = new EnumeracionTipoCliente(1, 10);
  public static readonly CLIENTE_TIPO_2 = new EnumeracionTipoCliente(2, 20);
  public static readonly CLIENTE_TIPO_3 = new EnumeracionTipoCliente(3, 30);
  public static readonly CLIENTE_TIPO_4 = new EnumeracionTipoCliente(4, 0);

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
