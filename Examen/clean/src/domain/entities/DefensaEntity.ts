import { EstudianteEntity } from "./EstudianteEntity";
import { JuradoAsignadoEntity } from "./JuradoAsignadoEntity";

/**
 * Representa una defensa de trabajo de titulación.
 * Incluye información sobre el trabajo, fecha, aula, estudiantes y jurados asignados.
 */
export class DefensaEntity {
  constructor(
    public id: number,
    public titulo: string,
    public fecha: Date,
    public aulaId: number,
    public horarioId: number,
    public estado: 'pendiente' | 'programada' | 'finalizada',
    public estudiantes: EstudianteEntity[],
    public jurados: JuradoAsignadoEntity[]
  ) {}
}


// Justificación: Es el evento principal del sistema, centraliza la información y relaciones.
