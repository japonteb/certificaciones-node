import { Examen } from '../../modelo/examen';

export abstract class RepositorioExamen {
  abstract existe(clienteId: number, certificacionId: number): Promise<boolean>;
  abstract existeCertificacionEnExamenesPorCertificacionId(
    certificacionId: number
  ): Promise<boolean>;
  abstract guardar(examen: Examen);
}
