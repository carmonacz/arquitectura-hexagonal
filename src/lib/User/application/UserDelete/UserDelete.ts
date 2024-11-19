import { UserId } from "../../domain/UserId";
import { UserNotFoundError } from "../../domain/UserNotFoundError";
import { UserRepository } from "../../domain/UserRepository";

export class UserDelete {
  constructor(private repository: UserRepository) {}

  async run(id: string): Promise<void> {
    const userId = new UserId(id);
    const userExists = await this.repository.getOneById(userId);

    if (!userExists) throw new UserNotFoundError("User not Found");

    await this.repository.delete(userId);
  }
}
