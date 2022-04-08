import { ErrorIntegridadDatos } from 'src/dominio/errores/error-integridad-datos';
import { RepositorioExamen } from 'src/dominio/examen/puerto/repositorio/repositorio-examen';
import { RepositorioCertificacion } from '../puerto/repositorio/repositorio-certificacion';

export class ServicioEliminarCertificacion {
  constructor(
    private readonly _repositorioCertificacion: RepositorioCertificacion,
    private readonly _repositorioExamen: RepositorioExamen
  ) {}

  async ejecutar(certificacionId: number) {
    if (
      await this._repositorioExamen.existeCertificacionEnExamenesPorCertificacionId(
        certificacionId
      )
    ) {
      throw new ErrorIntegridadDatos(
        `No se puede eliminar la certificación ${certificacionId} porque está asociada a exámenes`
      );
    }
    this._repositorioCertificacion.eliminar(certificacionId);
  }
}
