import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  create(user: User): Promise<void> {
    return this.repository.create(user);
  }
}

//Esto es una forma de hacerlo, pero en esta foma se tendrían que crear todos los metodos de uso en un solo archivo, hay otra forma de hacerlo y es creando un archivo por cada metodo de uso. Esta forma de hacerlo es para cuando las aplicaciones sean pequeñas.
