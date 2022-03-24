import { Module } from '@nestjs/common';
import { ExamenControlador } from './controlador/examen.controlador';
import { ExamenProveedorModule } from './proveedor/examen-proveedor.module';

@Module({
  imports: [ExamenProveedorModule],
  controllers: [ExamenControlador],
})
export class ExamenModule {}
