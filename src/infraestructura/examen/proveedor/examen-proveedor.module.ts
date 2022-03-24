import { Module } from '@nestjs/common';
import { ServicioRegistrarExamen } from 'src/dominio/examen/servicio/servicio-registrar-examen';
import { RepositorioExamen } from 'src/dominio/examen/puerto/repositorio/repositorio-examen';
import { servicioRegistrarExamenProveedor } from './servicio/servicio-registrar-examen.proveedor';
import { repositorioExamenProvider } from './repositorio/repositorio-examen.proveedor';
import { daoExamenProvider } from './dao/dao-examen.proveedor';
import { ManejadorRegistrarExamen } from 'src/aplicacion/examen/comando/registrar-examen.manejador';
import { ManejadorListarExamenPorCliente } from 'src/aplicacion/examen/consulta/listar-examenes-por-cliente.manejador';
import { DaoExamen } from 'src/dominio/examen/puerto/dao/dao-examen';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamenEntidad } from '../entidad/examen.entidad';

@Module({
  imports: [TypeOrmModule.forFeature([ExamenEntidad])],
  providers: [
    {
      provide: ServicioRegistrarExamen,
      inject: [RepositorioExamen],
      useFactory: servicioRegistrarExamenProveedor,
    },
    repositorioExamenProvider,
    daoExamenProvider,
    ManejadorRegistrarExamen,
    ManejadorListarExamenPorCliente,
  ],
  exports: [
    ServicioRegistrarExamen,
    ManejadorRegistrarExamen,
    ManejadorListarExamenPorCliente,
    RepositorioExamen,
    DaoExamen,
  ],
})
export class ExamenProveedorModule {}
