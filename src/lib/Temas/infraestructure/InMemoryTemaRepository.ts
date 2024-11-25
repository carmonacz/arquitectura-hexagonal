import { Tema } from "../dominio/Tema";
import { TemaId } from "../dominio/TemaId";
import { TemaRepository } from "../dominio/TemaRepository";

export class InMemoryTemaRepository implements TemaRepository {
  private temas: Tema[] = [];

  async create(tema: Tema): Promise<void> {
    this.temas.push(tema);
  }

  async getAll(): Promise<Tema[]> {
    return this.temas;
  }

  async getOneById(id: TemaId): Promise<Tema | null> {
    return this.temas.find((tema) => tema.id.value === id.value) || null;
  }

  async edit(tema: Tema): Promise<void> {
    const index = this.temas.findIndex((t) => t.id.value === tema.id.value);
    this.temas[index] = tema;
  }

  async delete(id: TemaId): Promise<void> {
    this.temas = this.temas.filter((tema) => tema.id.value !== id.value);
  }
}
