import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorDuplicidad extends ErrorDeNegocio {
  constructor(mensaje: string) {
    super(mensaje, ErrorDuplicidad.name);
  }
}
