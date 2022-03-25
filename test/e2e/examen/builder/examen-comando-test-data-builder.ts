import { ComandoCliente } from './../../../../src/aplicacion/cliente/comando/cliente.comando';
import { ComandoCertificacion } from 'src/aplicacion/certificacion/comando/certificacion.comando';
import { ClienteComandoTestDataBuilder } from 'test/e2e/cliente/builder/cliente-comando-test-data-builder';
import { ComandoRegistrarExamen } from 'src/aplicacion/examen/comando/registrar-examen.comando';
import { CertificacionComandoTestDataBuilder } from 'test/e2e/certificacion/builder/certificacion-comando-test-data-builder';

export class ExamenComandoTestDataBuilder {
  #id: number;
  #comandoCliente: ComandoCliente;
  #comandoCertificacion: ComandoCertificacion;
  #fechaPresentacion: string;
  #precioTotal: number;

  constructor() {
    this.#comandoCliente = new ClienteComandoTestDataBuilder().build();
    this.#comandoCertificacion =
      new CertificacionComandoTestDataBuilder().build();
    this.#fechaPresentacion = new Date(
      Date.now() + 3600 * 1000 * 24
    ).toISOString();
    this.#precioTotal = 1000;
  }

  public conComandoCliente(
    comandoCliente: ComandoCliente
  ): ExamenComandoTestDataBuilder {
    this.#comandoCliente = comandoCliente;
    return this;
  }

  public conComandoCertificacion(
    comandoCertificacion: ComandoCertificacion
  ): ExamenComandoTestDataBuilder {
    this.#comandoCertificacion = comandoCertificacion;
    return this;
  }

  public build(): ComandoRegistrarExamen {
    return new ComandoRegistrarExamen(
      this.#id,
      this.#comandoCliente,
      this.#comandoCertificacion,
      this.#fechaPresentacion,
      this.#precioTotal
    );
  }
}
