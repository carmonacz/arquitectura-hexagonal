import { Tema } from "../../dominio/Tema";
import { TemaId } from "../../dominio/TemaId";
import { TemaNombre } from "../../dominio/TemaNombre";
import { TemaRepository } from "../../dominio/TemaRepository";

export class TemaCreate {
  constructor(private repository: TemaRepository) {}

  async run(id: string, nombre: string): Promise<void> {
    const tema = new Tema(new TemaId(id), new TemaNombre(nombre));

    return this.repository.create(tema);
  }
}
