export class UserId {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  //Metodos de validación para nuestro atributo
  private ensureIsValid() {
    if (this.value.length < 5) {
      throw new Error("Userid must be at least 5 characters long");
    }
  }
}
