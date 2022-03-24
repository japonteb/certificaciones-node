import { ValidadorArgumento } from './../../validador/validador-argumento';

export class Certificacion {
  readonly #id: number;
  readonly #nombre: string;
  readonly #detalle: string;
  readonly #duracion: number;
  readonly #precio: number;

  readonly SE_DEBE_INGRESAR_EL_NOMBRE_DE_CERTIFICACION: string =
    'Se debe ingresar el nombre de la certificación';
  readonly SE_DEBE_INGRESAR_EL_DETALLE_DE_CERTIFICACION: string =
    'Se debe ingresar el detalle de la certificación';
  readonly SE_DEBE_INGRESAR_LA_DURACION: string =
    'Se debe ingresar la duración en horas de la certificación';
  readonly SE_DEBE_INGRESAR_EL_PRECIO: string =
    'Se debe ingresar el precio de la certificación';
  readonly LA_DURACION_DEBE_SER_MAYOR_A_CERO: string =
    'La duración de la certificación debe ser mayor a cero';
  readonly EL_PRECIO_DEBE_SER_MAYOR_A_CERO: string =
    'El precio de la certificación debe ser mayor a cero';

  constructor(
    id: number,
    nombre: string,
    detalle: string,
    duracion: number,
    precio: number
  ) {
    ValidadorArgumento.validarObligatorio(
      nombre,
      this.SE_DEBE_INGRESAR_EL_NOMBRE_DE_CERTIFICACION
    );
    ValidadorArgumento.validarObligatorio(
      detalle,
      this.SE_DEBE_INGRESAR_EL_DETALLE_DE_CERTIFICACION
    );
    ValidadorArgumento.validarObligatorio(
      precio,
      this.SE_DEBE_INGRESAR_EL_PRECIO
    );
    ValidadorArgumento.validarObligatorio(
      duracion,
      this.SE_DEBE_INGRESAR_LA_DURACION
    );
    ValidadorArgumento.validarPositivo(
      duracion,
      this.LA_DURACION_DEBE_SER_MAYOR_A_CERO
    );
    ValidadorArgumento.validarPositivo(
      precio,
      this.EL_PRECIO_DEBE_SER_MAYOR_A_CERO
    );

    this.#id = id;
    this.#nombre = nombre;
    this.#detalle = detalle;
    this.#duracion = duracion;
    this.#precio = precio;
  }

  get id(): number {
    return this.#id;
  }

  get nombre(): string {
    return this.#nombre;
  }

  get detalle(): string {
    return this.#detalle;
  }

  get duracion(): number {
    return this.#duracion;
  }

  get precio(): number {
    return this.#precio;
  }
}
