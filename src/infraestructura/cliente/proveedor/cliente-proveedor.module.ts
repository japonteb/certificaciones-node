import { Module } from '@nestjs/common';
import { daoClienteProvider } from './dao/dao-cliente.proveedor';
import { ManejadorListarCliente } from 'src/aplicacion/cliente/consulta/listar-clientes.manejador';
import { ManejadorObtenerClientePorId } from 'src/aplicacion/cliente/consulta/obtener-cliente-por-id.manejador';
import { DaoCliente } from 'src/dominio/cliente/puerto/dao/dao-cliente';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntidad } from '../entidad/cliente.entidad';

@Module({
  imports: [TypeOrmModule.forFeature([ClienteEntidad])],
  providers: [
    daoClienteProvider,
    ManejadorListarCliente,
    ManejadorObtenerClientePorId,
  ],
  exports: [ManejadorListarCliente, ManejadorObtenerClientePorId, DaoCliente],
})
export class ClienteProveedorModule {}
