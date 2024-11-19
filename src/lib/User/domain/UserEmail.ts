export class UserEmail {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureIsValid();
  }

  //Metodos de validación para nuestro atributo
  private ensureIsValid() {
    if (!this.value.includes("@") || !this.value.includes(".")) {
      throw new Error("UserEmail must be a valid email address");
    }
  }
}
