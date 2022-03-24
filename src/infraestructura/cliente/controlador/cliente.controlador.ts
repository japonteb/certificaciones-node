import { Controller, Get, Param } from '@nestjs/common';
import { ClienteDto } from 'src/aplicacion/cliente/consulta/dto/cliente.dto';
import { ManejadorListarCliente } from 'src/aplicacion/cliente/consulta/listar-clientes.manejador';
import { ManejadorObtenerClientePorId } from 'src/aplicacion/cliente/consulta/obtener-cliente-por-id.manejador';

@Controller('clientes')
export class ClienteControlador {
  constructor(
    private readonly _manejadorListarCliente: ManejadorListarCliente,
    private readonly _manejadorObtenerClientePorId: ManejadorObtenerClientePorId
  ) {}

  @Get()
  async listar(): Promise<ClienteDto[]> {
    return this._manejadorListarCliente.ejecutar();
  }

  @Get(':id')
  async listarobtenerClientePorId(
    @Param('id') clienteId: number
  ): Promise<ClienteDto> {
    return this._manejadorObtenerClientePorId.ejecutar(clienteId);
  }
}
