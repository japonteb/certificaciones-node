import { CertificacionDto } from './../../../../aplicacion/certificacion/consulta/dto/certificacion.dto';
import { Certificacion } from './../../modelo/certificacion';

export abstract class RepositorioCertificacion {
  abstract guardar(certificacion: Certificacion): Promise<CertificacionDto>;
  abstract eliminar(certificacionId: number);
  abstract existePorNombreYDetalle(
    nombre: string,
    detalle: string
  ): Promise<boolean>;
  abstract existePorId(certificacionId: number): Promise<boolean>;
}
