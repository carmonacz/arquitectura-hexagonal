import { Tema } from "../../dominio/Tema";
import { TemaId } from "../../dominio/TemaId";
import { TemaNombre } from "../../dominio/TemaNombre";
import { TemaNotFoundError } from "../../dominio/TemaNotFoundError";
import { TemaRepository } from "../../dominio/TemaRepository";

export class TemaEdit {
  constructor(private repository: TemaRepository) {}

  async run(id: string, nombre: string): Promise<void> {
    const tema = new Tema(new TemaId(id), new TemaNombre(nombre));

    const temaExists = await this.repository.getOneById(tema.id);

    if (!temaExists) throw new TemaNotFoundError("Tema no Encontrado");

    return this.repository.edit(tema);
  }
}
