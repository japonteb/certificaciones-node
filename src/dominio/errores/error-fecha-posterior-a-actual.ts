import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorFechaPosteriorAActual extends ErrorDeNegocio {
  constructor(mensaje: string) {
    super(mensaje, ErrorFechaPosteriorAActual.name);
  }
}
