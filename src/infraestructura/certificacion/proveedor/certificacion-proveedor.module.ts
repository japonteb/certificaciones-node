import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManejadorEliminarCertificacion } from 'src/aplicacion/certificacion/comando/eliminar-certificacion.manejador';
import { ManejadorRegistrarCertificacion } from 'src/aplicacion/certificacion/comando/registrar-certificacion.manejador';
import { ManejadorListarCertificacion } from 'src/aplicacion/certificacion/consulta/listar-certificaciones.manejador';
import { DaoCertificacion } from 'src/dominio/certificacion/puerto/dao/dao-certificacion';
import { RepositorioCertificacion } from 'src/dominio/certificacion/puerto/repositorio/repositorio-certificacion';
import { ServicioEliminarCertificacion } from 'src/dominio/certificacion/servicio/servicio-eliminar-certificacion';
import { ServicioRegistrarCertificacion } from 'src/dominio/certificacion/servicio/servicio-registrar-certificacion';
import { RepositorioExamen } from 'src/dominio/examen/puerto/repositorio/repositorio-examen';
import { ExamenProveedorModule } from 'src/infraestructura/examen/proveedor/examen-proveedor.module';
import { CertificacionEntidad } from '../entidad/certificacion.entidad';
import { daoCertificacionProvider } from './dao/dao-certificacion.proveedor';
import { repositorioCertificacionProvider } from './repositorio/repositorio-certificacion.proveedor';
import { servicioEliminarCertificacionProveedor } from './servicio/servicio-eliminar-certificacion.proveedor';
import { servicioRegistrarCertificacionProveedor } from './servicio/servicio-registrar-certificacion.proveedor';

@Module({
  imports: [
    TypeOrmModule.forFeature([CertificacionEntidad]),
    ExamenProveedorModule,
  ],
  providers: [
    {
      provide: ServicioRegistrarCertificacion,
      inject: [RepositorioCertificacion],
      useFactory: servicioRegistrarCertificacionProveedor,
    },
    {
      provide: ServicioEliminarCertificacion,
      inject: [RepositorioCertificacion, RepositorioExamen],
      useFactory: servicioEliminarCertificacionProveedor,
    },
    repositorioCertificacionProvider,
    daoCertificacionProvider,
    ManejadorRegistrarCertificacion,
    ManejadorEliminarCertificacion,
    ManejadorListarCertificacion,
  ],
  exports: [
    ServicioRegistrarCertificacion,
    ManejadorRegistrarCertificacion,
    ManejadorEliminarCertificacion,
    ManejadorListarCertificacion,
    RepositorioCertificacion,
    DaoCertificacion,
  ],
})
export class CertificacionProveedorModule {}
