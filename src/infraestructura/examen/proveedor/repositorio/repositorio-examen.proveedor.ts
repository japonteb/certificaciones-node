import { RepositorioExamen } from 'src/dominio/examen/puerto/repositorio/repositorio-examen';
import { RepositorioExamenMysql } from 'src/infraestructura/examen/adaptador/repositorio/repositorio-examen-mysql';

export const repositorioExamenProvider = {
  provide: RepositorioExamen,
  useClass: RepositorioExamenMysql,
};
