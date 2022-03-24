import { ErrorValorPositivo } from 'src/dominio/errores/error-valor-positivo';
import { ErrorValorRequerido } from 'src/dominio/errores/error-valor-requerido';
import { ErrorFechaPosteriorAActual } from '../errores/error-fecha-posterior-a-actual';

export class ValidadorArgumento {
  public static validarObligatorio(valor: any, mensaje: string) {
    if (valor === null) {
      throw new ErrorValorRequerido(mensaje);
    }
  }

  public static validarPositivo(valor: number, mensaje: string) {
    if (valor <= 0) {
      throw new ErrorValorPositivo(mensaje);
    }
  }

  public static validarFechaPosteriorAActual(valor: Date, mensaje: string) {
    const fechaActual: Date = new Date();
    if (valor < fechaActual) {
      throw new ErrorFechaPosteriorAActual(mensaje);
    }
  }
}
