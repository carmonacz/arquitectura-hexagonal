import { Tema } from "./Tema";
import { TemaId } from "./TemaId";

export interface TemaRepository {
  create(tema: Tema): Promise<void>;
  getAll(): Promise<Tema[]>;
  getOneById(id: TemaId): Promise<Tema | null>;
  edit(tema: Tema): Promise<void>;
  delete(id: TemaId): Promise<void>;
}
