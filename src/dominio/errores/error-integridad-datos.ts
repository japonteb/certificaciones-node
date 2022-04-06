import { ErrorDeNegocio } from 'src/dominio/errores/error-de-negocio';
export class ErrorIntegridadDatos extends ErrorDeNegocio {
  constructor(mensaje: string) {
    super(mensaje, ErrorIntegridadDatos.name);
  }
}
