import { createPool, Pool, RowDataPacket } from "mysql2/promise";
import { TemaRepository } from "../dominio/TemaRepository";
import { Tema } from "../dominio/Tema";
import { TemaId } from "../dominio/TemaId";
import { TemaNombre } from "../dominio/TemaNombre";

type MysqlTemas = {
  id: string;
  nombre: string;
} & RowDataPacket;

export class MysqlTemaRepository implements TemaRepository {
  client: Pool;

  constructor() {
    // Crear un pool de conexiones con mysql2/promise
    this.client = createPool({
      host: "localhost",
      user: "root",
      password: "",
      database: "oposiciones",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  async create(tema: Tema): Promise<void> {
    const query = "INSERT INTO temas (nombre) VALUES (?)";
    const values = [tema.nombre.value];

    await this.client.execute(query, values);
  }

  async getAll(): Promise<Tema[]> {
    const query = "SELECT * FROM temas";

    // `rows` contiene el resultado de la consulta
    const [rows] = await this.client.execute<MysqlTemas[]>(query);

    // Mapear cada fila a un dominio Tema
    return rows.map((row) => this.mapToDomain(row));
  }

  async getOneById(id: TemaId): Promise<Tema | null> {
    const query = "SELECT * FROM temas WHERE id = ?";
    const values = [id.value];

    const [rows] = await this.client.execute<MysqlTemas[]>(query, values);

    if (rows.length === 0) return null;

    const row = rows[0];

    return this.mapToDomain(row);
  }

  async edit(tema: Tema): Promise<void> {
    const query = "UPDATE temas SET nombre = ?  WHERE id = ?";
    const values = [tema.nombre.value, tema.id.value];

    await this.client.execute(query, values);
  }

  async delete(id: TemaId): Promise<void> {
    const query = "DELETE FROM temas WHERE id = ?";
    const values = [id.value];

    await this.client.execute(query, values);
  }

  private mapToDomain(tema: MysqlTemas): Tema {
    return new Tema(new TemaId(tema.id), new TemaNombre(tema.nombre));
  }
}
