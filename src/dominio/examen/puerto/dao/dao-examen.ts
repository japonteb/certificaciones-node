import { ExamenDto } from 'src/aplicacion/examen/consulta/dto/examen.dto';

export abstract class DaoExamen {
  abstract listarPorClienteId(clienteId: number): Promise<ExamenDto[]>;
}
