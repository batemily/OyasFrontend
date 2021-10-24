export class RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  tel: string;

  constructor(firstname: string, lastname: string, email: string, password: string, tel: string) {
    this.firstName = firstname;
    this.lastName = lastname;
    this.email = email;
    this.password = password;
    this.tel = tel;
  }

}
