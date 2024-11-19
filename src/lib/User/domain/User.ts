//Aquí se define la entidad del usuario
import { UserCreatedAt } from "./UserCreatedAt";
import { UserEmail } from "./UserEmail";
import { UserId } from "./UserId";
import { UserName } from "./UserName";

export class User {
  id: UserId;
  name: UserName;
  email: UserEmail;
  createdAt: UserCreatedAt;

  constructor(id: UserId, name: UserName, email: UserEmail, createdAt: UserCreatedAt) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
  }

  //Métodos de servicios de dominio
  public nameAndEmail() {
    return `${this.name} - ${this.email}`;
  }

  public mapToPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      email: this.email.value,
      createdAt: this.createdAt.value,
    };
  }
}

//Value Objects para definir las  propiedades de nuestra  clase lo haremos por cada atributo de nuestra clase y lo modularemos en tantos archivos diferentes como atributos tenga nuestra clase.
