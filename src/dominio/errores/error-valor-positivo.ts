import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorValorPositivo extends ErrorDeNegocio {
  constructor(mensaje: string) {
    super(mensaje, ErrorValorPositivo.name);
  }
}
