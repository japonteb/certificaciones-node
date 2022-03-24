import { Cliente } from 'src/dominio/cliente/modelo/cliente';

export class ClienteTestDataBuilder {
  #id: number;
  #nombre: string;
  #codigoTipoCliente: number;

  constructor() {
    this.#id = 1;
    this.#nombre = 'William';
    this.#codigoTipoCliente = 4;
  }

  public conId(id: number): ClienteTestDataBuilder {
    this.#id = id;
    return this;
  }

  public conNombre(nombre: string): ClienteTestDataBuilder {
    this.#nombre = nombre;
    return this;
  }

  public conCodigoTipoCliente(
    codigoTipoCliente: number
  ): ClienteTestDataBuilder {
    this.#codigoTipoCliente = codigoTipoCliente;
    return this;
  }

  public build(): Cliente {
    return new Cliente(this.#id, this.#nombre, this.#codigoTipoCliente);
  }
}
