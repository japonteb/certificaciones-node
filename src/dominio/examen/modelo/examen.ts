import { Certificacion } from 'src/dominio/certificacion/modelo/certificacion';
import { Cliente } from 'src/dominio/cliente/modelo/cliente';
import { UtilidadesFecha } from 'src/dominio/utilidad/utilidades-fecha';
import { ValidadorArgumento } from 'src/dominio/validador/validador-argumento';

export class Examen {
  readonly #id: number;
  readonly #cliente: Cliente;
  readonly #certificacion: Certificacion;
  readonly #fechaPresentacion: Date;
  readonly #precioTotal: number;

  readonly SE_DEBE_INGRESAR_EL_CLIENTE_DEL_EXAMEN =
    'Se debe ingresar el cliente que va a presentar el examen';
  readonly SE_DEBE_INGRESAR_LA_CERTIFICACION_DEL_EXAMEN =
    'Se debe ingresar la certificación del examen';
  readonly SE_DEBE_INGRESAR_LA_FECHA_DE_PRESENTACION_DEL_EXAMEN =
    'Se debe ingresar la fecha de presentación del examen';
  readonly SE_DEBE_INGRESAR_LA_FECHA_DE_PRESENTACION_DEL_EXAMEN_POSTERIOR_A_ACTUAL =
    'La fecha de presentación del examen no puede ser anterior a la fecha actual';

  constructor(
    id: number,
    cliente: Cliente,
    certificacion: Certificacion,
    fechaPresentacion: string
  ) {
    ValidadorArgumento.validarObligatorio(
      cliente,
      this.SE_DEBE_INGRESAR_EL_CLIENTE_DEL_EXAMEN
    );
    ValidadorArgumento.validarObligatorio(
      certificacion,
      this.SE_DEBE_INGRESAR_LA_CERTIFICACION_DEL_EXAMEN
    );
    ValidadorArgumento.validarObligatorio(
      fechaPresentacion,
      this.SE_DEBE_INGRESAR_LA_FECHA_DE_PRESENTACION_DEL_EXAMEN
    );

    ValidadorArgumento.validarFechaPosteriorAActual(
      new Date(fechaPresentacion),
      this
        .SE_DEBE_INGRESAR_LA_FECHA_DE_PRESENTACION_DEL_EXAMEN_POSTERIOR_A_ACTUAL
    );
    this.#id = id;
    this.#cliente = cliente;
    this.#certificacion = certificacion;
    this.#fechaPresentacion = new Date(fechaPresentacion);
    this.#precioTotal = this.calcularPrecioTotal();
  }

  get id(): number {
    return this.#id;
  }

  get cliente(): Cliente {
    return this.#cliente;
  }

  get certificacion(): Certificacion {
    return this.#certificacion;
  }

  get fechaPresentacion(): Date {
    return this.#fechaPresentacion;
  }

  get precioTotal(): number {
    return this.#precioTotal;
  }

  private calcularPrecioTotal(): number {
    let precio: number = this.#certificacion.precio;
    if (UtilidadesFecha.esFestivo(this.#fechaPresentacion)) {
      precio = precio * 3;
    } else if (UtilidadesFecha.esFinDeSemana(this.#fechaPresentacion)) {
      precio = precio * 2;
    }

    precio =
      ((100 - this.#cliente.tipoCliente.porcentajeDescuento) * precio) / 100;

    return precio;
  }
}
