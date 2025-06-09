/**
 * Representa un aula disponible para defensas.
 */
export class AulaEntity {
  constructor(
    public id: number,
    public nombre: string,
    public capacidad: number,
    public ubicacion: string
  ) {}
}



// Justificación: Permite gestionar la disponibilidad y asignación de espacios físicos.