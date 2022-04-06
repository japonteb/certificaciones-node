import { Certificacion } from 'src/dominio/certificacion/modelo/certificacion';
import { Cliente } from 'src/dominio/cliente/modelo/cliente';
import { EnumeracionTipoCliente } from 'src/dominio/cliente/modelo/enumeracion-tipo-cliente';
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

    const PRECIO_EXAMEN_FESTIVO_ES_TRIPLE = 3;
    const PRECIO_EXAMEN_FIN_DE_SEMANA_ES_DOBLE = 2;
    const PORCENTAJE_PRECIO_TOTAL_EXAMEN = 100;

    if (UtilidadesFecha.esFestivo(this.#fechaPresentacion)) {
      precio = precio * PRECIO_EXAMEN_FESTIVO_ES_TRIPLE;
    } else if (UtilidadesFecha.esFinDeSemana(this.#fechaPresentacion)) {
      precio = precio * PRECIO_EXAMEN_FIN_DE_SEMANA_ES_DOBLE;
    }

    precio =
      ((PORCENTAJE_PRECIO_TOTAL_EXAMEN -
        EnumeracionTipoCliente.obtenerEnumeracionTipoClienteDeCodigo(
          this.#cliente.tipoCliente
        ).porcentajeDescuento) *
        precio) /
      PORCENTAJE_PRECIO_TOTAL_EXAMEN;

    return precio;
  }
}
