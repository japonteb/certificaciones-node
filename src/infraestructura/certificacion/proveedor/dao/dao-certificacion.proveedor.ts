import { DaoCertificacion } from 'src/dominio/certificacion/puerto/dao/dao-certificacion';
import { DaoCertificacionMysql } from 'src/infraestructura/certificacion/adaptador/dao/dao-certificacion-mysql';

export const daoCertificacionProvider = {
  provide: DaoCertificacion,
  useClass: DaoCertificacionMysql,
};
