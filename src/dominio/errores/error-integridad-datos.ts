export class ErrorIntegridadDatos extends Error {
  constructor(mensaje: string, clase?: string) {
    super(mensaje);
    this.name = clase || ErrorIntegridadDatos.name;
  }
}
