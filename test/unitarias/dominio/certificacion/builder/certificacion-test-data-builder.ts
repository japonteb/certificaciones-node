import { Certificacion } from 'src/dominio/certificacion/modelo/certificacion';

export class CertificacionTestDataBuilder {
  #id: number;
  #nombre: string;
  #detalle: string;
  #duracion: number;
  #precio: number;

  constructor() {
    this.#id = 1;
    this.#nombre = 'Java';
    this.#detalle = 'Java EE y Servicios Web';
    this.#duracion = 120;
    this.#precio = 1000;
  }

  public conId(id: number): CertificacionTestDataBuilder {
    this.#id = id;
    return this;
  }

  public conNombre(nombre: string): CertificacionTestDataBuilder {
    this.#nombre = nombre;
    return this;
  }

  public conDetalle(detalle: string): CertificacionTestDataBuilder {
    this.#detalle = detalle;
    return this;
  }

  public conDuracion(duracion: number): CertificacionTestDataBuilder {
    this.#duracion = duracion;
    return this;
  }

  public conPrecio(precio: number): CertificacionTestDataBuilder {
    this.#precio = precio;
    return this;
  }

  public build(): Certificacion {
    return new Certificacion(
      this.#id,
      this.#nombre,
      this.#detalle,
      this.#duracion,
      this.#precio
    );
  }
}
