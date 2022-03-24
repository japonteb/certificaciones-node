import { Certificacion } from './../../modelo/certificacion';

export abstract class RepositorioCertificacion {
  abstract guardar(certificacion: Certificacion);
  abstract eliminar(certificacionId: number);
  abstract existePorNombreYDetalle(
    nombre: string,
    detalle: string
  ): Promise<boolean>;
  abstract existePorId(certificacionId: number): Promise<boolean>;
}
