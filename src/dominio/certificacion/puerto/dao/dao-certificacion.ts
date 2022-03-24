import { CertificacionDto } from 'src/aplicacion/certificacion/consulta/dto/certificacion.dto';

export abstract class DaoCertificacion {
  abstract listar(): Promise<CertificacionDto[]>;
}
