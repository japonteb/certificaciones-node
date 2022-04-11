import { ErrorDuplicidad } from 'src/dominio/errores/error-duplicidad';
import { Examen } from '../modelo/examen';
import { RepositorioExamen } from '../puerto/repositorio/repositorio-examen';

export class ServicioRegistrarExamen {
  constructor(private readonly _repositorioExamen: RepositorioExamen) {}

  async ejecutar(examen: Examen) {
    await this.validarExamenProgramado(examen);
    await this._repositorioExamen.guardar(examen);
  }

  private async validarExamenProgramado(examen: Examen) {
    if (
      await this._repositorioExamen.existe(
        examen.cliente.id,
        examen.certificacion.id
      )
    ) {
      throw new ErrorDuplicidad(`El examen ya está programado en el sistema`);
    }
  }
}
