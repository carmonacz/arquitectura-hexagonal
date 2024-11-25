import { Tema } from "../../dominio/Tema";
import { TemaId } from "../../dominio/TemaId";
import { TemaNotFoundError } from "../../dominio/TemaNotFoundError";
import { TemaRepository } from "../../dominio/TemaRepository";

export class TemaGetOneById {
  constructor(private repository: TemaRepository) {}

  async run(id: string): Promise<Tema> {
    const tema = await this.repository.getOneById(new TemaId(id));

    if (!tema) throw new TemaNotFoundError("Tema no Encontrado");

    return tema;
  }
}
