import { Certificacion } from 'src/dominio/certificacion/modelo/certificacion';
import { Cliente } from 'src/dominio/cliente/modelo/cliente';
import { Examen } from 'src/dominio/examen/modelo/examen';
import { CertificacionTestDataBuilder } from './../../certificacion/builder/certificacion-test-data-builder';
import { ClienteTestDataBuilder } from './../../cliente/builder/cliente-test-data-builder';

export class ExamenTestDataBuilder {
  #id: number;
  #cliente: Cliente;
  #certificacion: Certificacion;
  #fechaPresentacion: string;

  constructor() {
    this.#id = 1;
    this.#cliente = new ClienteTestDataBuilder().build();
    this.#certificacion = new CertificacionTestDataBuilder().build();
    this.#fechaPresentacion = new Date(
      Date.now() + 3600 * 1000 * 24
    ).toISOString();
  }

  public conId(id: number): ExamenTestDataBuilder {
    this.#id = id;
    return this;
  }

  public conCliente(cliente: Cliente): ExamenTestDataBuilder {
    this.#cliente = cliente;
    return this;
  }

  public conCertificacion(certificacion: Certificacion): ExamenTestDataBuilder {
    this.#certificacion = certificacion;
    return this;
  }

  public conFechaPresentacion(
    fechaPresentacion: string
  ): ExamenTestDataBuilder {
    this.#fechaPresentacion = fechaPresentacion;
    return this;
  }

  public build(): Examen {
    return new Examen(
      this.#id,
      this.#cliente,
      this.#certificacion,
      this.#fechaPresentacion
    );
  }
}
