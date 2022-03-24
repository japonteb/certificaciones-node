import { RepositorioExamen } from 'src/dominio/examen/puerto/repositorio/repositorio-examen';
import { ServicioRegistrarExamen } from 'src/dominio/examen/servicio/servicio-registrar-examen';

export function servicioRegistrarExamenProveedor(
  repositorioExamen: RepositorioExamen
) {
  return new ServicioRegistrarExamen(repositorioExamen);
}
