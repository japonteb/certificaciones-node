import { Injectable } from '@nestjs/common';
import { Certificacion } from 'src/dominio/certificacion/modelo/certificacion';
import { Cliente } from 'src/dominio/cliente/modelo/cliente';
import { Examen } from 'src/dominio/examen/modelo/examen';
import { ServicioRegistrarExamen } from 'src/dominio/examen/servicio/servicio-registrar-examen';
import { ComandoRegistrarExamen } from './registrar-examen.comando';

@Injectable()
export class ManejadorRegistrarExamen {
  constructor(private _servicioRegistrarExamen: ServicioRegistrarExamen) {}

  async ejecutar(comandoRegistrarExamen: ComandoRegistrarExamen) {
    const cliente: Cliente = new Cliente(
      comandoRegistrarExamen.comandoCliente.id,
      comandoRegistrarExamen.comandoCliente.nombre,
      comandoRegistrarExamen.comandoCliente.tipoCliente
    );

    const certificacion: Certificacion = new Certificacion(
      comandoRegistrarExamen.comandoCertificacion.id,
      comandoRegistrarExamen.comandoCertificacion.nombre,
      comandoRegistrarExamen.comandoCertificacion.detalle,
      comandoRegistrarExamen.comandoCertificacion.duracion,
      comandoRegistrarExamen.comandoCertificacion.precio
    );
    await this._servicioRegistrarExamen.ejecutar(
      new Examen(
        comandoRegistrarExamen.id,
        cliente,
        certificacion,
        comandoRegistrarExamen.fechaPresentacion
      )
    );
  }
}
