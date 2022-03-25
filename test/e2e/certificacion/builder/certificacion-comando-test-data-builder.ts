import { ComandoCertificacion } from 'src/aplicacion/certificacion/comando/certificacion.comando';

export class CertificacionComandoTestDataBuilder {
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

  public conId(id: number): CertificacionComandoTestDataBuilder {
    this.#id = id;
    return this;
  }

  public conNombre(nombre: string): CertificacionComandoTestDataBuilder {
    this.#nombre = nombre;
    return this;
  }

  public conDetalle(detalle: string): CertificacionComandoTestDataBuilder {
    this.#detalle = detalle;
    return this;
  }

  public conDuracion(duracion: number): CertificacionComandoTestDataBuilder {
    this.#duracion = duracion;
    return this;
  }

  public conPrecio(precio: number): CertificacionComandoTestDataBuilder {
    this.#precio = precio;
    return this;
  }

  public build(): ComandoCertificacion {
    return new ComandoCertificacion(
      this.#id,
      this.#nombre,
      this.#detalle,
      this.#duracion,
      this.#precio
    );
  }
}
