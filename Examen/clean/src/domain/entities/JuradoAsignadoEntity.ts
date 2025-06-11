import { JuradoEntity } from "./JuradoEntity";

/**
 * Relaciona un jurado con una defensa y su rol específico.
 */
export class JuradoAsignadoEntity {
  constructor(
    public jurado: JuradoEntity,
    public rol: 'presidente' | 'secretario' | 'vocal'
  ) {}
}
// Justificación: Permite asignar roles específicos a cada jurado en una defensa.