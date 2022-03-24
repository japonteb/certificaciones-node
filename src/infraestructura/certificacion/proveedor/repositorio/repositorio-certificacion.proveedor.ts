import { RepositorioCertificacion } from 'src/dominio/certificacion/puerto/repositorio/repositorio-certificacion';
import { RepositorioCertificacionMysql } from 'src/infraestructura/certificacion/adaptador/repositorio/repositorio-certificacion-mysql';

export const repositorioCertificacionProvider = {
  provide: RepositorioCertificacion,
  useClass: RepositorioCertificacionMysql,
};
