import { RepositorioCertificacion } from 'src/dominio/certificacion/puerto/repositorio/repositorio-certificacion';
import { ServicioRegistrarCertificacion } from 'src/dominio/certificacion/servicio/servicio-registrar-certificacion';

export function servicioRegistrarCertificacionProveedor(
  repositorioCertificacion: RepositorioCertificacion
) {
  return new ServicioRegistrarCertificacion(repositorioCertificacion);
}
