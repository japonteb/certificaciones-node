import { ComandoCliente } from './../../../../src/aplicacion/cliente/comando/cliente.comando';

export class ClienteComandoTestDataBuilder {
  #id: number;
  #nombre: string;
  #codigoTipoCliente: number;

  constructor() {
    this.#id = 1;
    this.#nombre = 'William';
    this.#codigoTipoCliente = 4;
  }

  public conId(id: number): ClienteComandoTestDataBuilder {
    this.#id = id;
    return this;
  }

  public conNombre(nombre: string): ClienteComandoTestDataBuilder {
    this.#nombre = nombre;
    return this;
  }

  public conCodigoTipoCliente(
    codigoTipoCliente: number
  ): ClienteComandoTestDataBuilder {
    this.#codigoTipoCliente = codigoTipoCliente;
    return this;
  }

  public build(): ComandoCliente {
    return new ComandoCliente(this.#id, this.#nombre, this.#codigoTipoCliente);
  }
}
