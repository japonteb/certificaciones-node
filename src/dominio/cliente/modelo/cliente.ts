import { ValidadorArgumento } from 'src/dominio/validador/validador-argumento';

export class Cliente {
  readonly #id: number;
  readonly #nombre: string;
  readonly #tipoCliente: number;

  readonly SE_DEBE_INGRESAR_EL_NOMBRE_DE_CLIENTE: string =
    'Se debe ingresar el nombre del cliente';
  readonly SE_DEBE_INGRESAR_EL_TIPO_DE_CLIENTE: string =
    'Se debe ingresar el tipo de cliente';

  constructor(id: number, nombre: string, tipoCliente: number) {
    ValidadorArgumento.validarObligatorio(
      nombre,
      this.SE_DEBE_INGRESAR_EL_NOMBRE_DE_CLIENTE
    );

    ValidadorArgumento.validarObligatorio(
      tipoCliente,
      this.SE_DEBE_INGRESAR_EL_TIPO_DE_CLIENTE
    );

    this.#id = id;
    this.#nombre = nombre;
    this.#tipoCliente = tipoCliente;
  }

  get id(): number {
    return this.#id;
  }

  get nombre(): string {
    return this.#nombre;
  }

  get tipoCliente(): number {
    return this.#tipoCliente;
  }
}
