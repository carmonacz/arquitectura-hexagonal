import { TemaId } from "./TemaId";
import { TemaNombre } from "./TemaNombre";

export class Tema {
  id: TemaId;
  nombre: TemaNombre;

  constructor(id: TemaId, nombre: TemaNombre) {
    this.id = id;
    this.nombre = nombre;
  }

  //Métodos de servicios de dominio

  public mapToPrimitives() {
    return {
      id: this.id.value,
      nombre: this.nombre.value,
    };
  }
}
