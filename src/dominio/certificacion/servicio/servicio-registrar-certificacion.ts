import { CertificacionDto } from 'src/aplicacion/certificacion/consulta/dto/certificacion.dto';
import { ErrorDuplicidad } from 'src/dominio/errores/error-duplicidad';
import { Certificacion } from '../modelo/certificacion';
import { RepositorioCertificacion } from '../puerto/repositorio/repositorio-certificacion';

export class ServicioRegistrarCertificacion {
  constructor(
    private readonly _repositorioCertificacion: RepositorioCertificacion
  ) {}

  async ejecutar(certificacion: Certificacion): Promise<CertificacionDto> {
    await this.validarExistenciaCertificacionConNombreYDetalle(certificacion);
    return this._repositorioCertificacion.guardar(certificacion);
  }

  private async validarExistenciaCertificacionConNombreYDetalle(
    certificacion: Certificacion
  ) {
    if (
      await this._repositorioCertificacion.existePorNombreYDetalle(
        certificacion.nombre,
        certificacion.detalle
      )
    ) {
      throw new ErrorDuplicidad(
        `La certificación con nombre ${certificacion.nombre} y detalle ${certificacion.detalle} ya existe en el sistema`
      );
    }
  }
}
