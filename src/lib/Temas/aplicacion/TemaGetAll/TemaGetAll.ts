import { Tema } from "../../dominio/Tema";
import { TemaRepository } from "../../dominio/TemaRepository";

export class TemaGetAll {
  constructor(private repository: TemaRepository) {}

  async run(): Promise<Tema[]> {
    return this.repository.getAll();
  }
}
