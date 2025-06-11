/**
 * Representa un horario disponible para asignar defensas.
 */
export class HorarioEntity {
  constructor(
    public id: number,
    public fecha: Date,
    public horaInicio: string,
    public horaFin: string
  ) {}
}
// Justificación: Permite organizar y evitar conflictos en la programación de defensas.