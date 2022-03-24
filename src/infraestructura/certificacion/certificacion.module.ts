import { Module } from '@nestjs/common';
import { CertificacionControlador } from './controlador/certificacion.controlador';
import { CertificacionProveedorModule } from './proveedor/certificacion-proveedor.module';

@Module({
  imports: [CertificacionProveedorModule],
  controllers: [CertificacionControlador],
})
export class CertificacionModule {}
