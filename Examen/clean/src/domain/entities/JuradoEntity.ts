/**
 * Representa a un jurado disponible para asignación.
 */
export class JuradoEntity {
  constructor(
    public id: number,
    public nombres: string,
    public apellidos: string,
    public especialidad: string
  ) {}
}
// Justificación: Permite gestionar los docentes que pueden ser asignados como jurados.