/**
 * Representa a un estudiante que participa en una defensa.
 */
export class EstudianteEntity {
  constructor(
    public id: number,
    public nombres: string,
    public apellidos: string,
    public cedula: string,
    public carrera: string,
    public trabajoTitulo: string
  ) {}
}
// Justificación: Permite identificar y asociar a los estudiantes con sus defensas.