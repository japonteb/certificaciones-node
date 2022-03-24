export class ErrorDuplicidad extends Error {
  constructor(mensaje: string, clase?: string) {
    super(mensaje);
    this.name = clase || ErrorDuplicidad.name;
  }
}
