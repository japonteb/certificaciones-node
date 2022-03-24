import { DaoExamen } from 'src/dominio/examen/puerto/dao/dao-examen';
import { DaoExamenMysql } from 'src/infraestructura/examen/adaptador/dao/dao-examen-mysql';

export const daoExamenProvider = {
  provide: DaoExamen,
  useClass: DaoExamenMysql,
};
