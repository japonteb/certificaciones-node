import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorCodigoClienteInvalido extends ErrorDeNegocio {
  constructor(mensaje: string) {
    super(mensaje, ErrorCodigoClienteInvalido.name);
  }
}
