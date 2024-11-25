import { TemaId } from "../../dominio/TemaId";
import { TemaNotFoundError } from "../../dominio/TemaNotFoundError";
import { TemaRepository } from "../../dominio/TemaRepository";

export class TemaDelete {
  constructor(private repository: TemaRepository) {}

  async run(id: string): Promise<void> {
    const temaId = new TemaId(id);
    const temaExists = await this.repository.getOneById(temaId);

    if (!temaExists) throw new TemaNotFoundError("Tema no Encontrado");

    await this.repository.delete(temaId);
  }
}
