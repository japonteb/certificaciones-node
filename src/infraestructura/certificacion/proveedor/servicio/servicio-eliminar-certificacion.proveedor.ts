import { RepositorioCertificacion } from 'src/dominio/certificacion/puerto/repositorio/repositorio-certificacion';
import { ServicioEliminarCertificacion } from 'src/dominio/certificacion/servicio/servicio-eliminar-certificacion';
import { RepositorioExamen } from 'src/dominio/examen/puerto/repositorio/repositorio-examen';

export function servicioEliminarCertificacionProveedor(
  repositorioCertificacion: RepositorioCertificacion,
  repositorioExamen: RepositorioExamen
) {
  return new ServicioEliminarCertificacion(
    repositorioCertificacion,
    repositorioExamen
  );
}
