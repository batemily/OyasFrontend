export class User {

  id: number ;
  firstName: string;
  lastName: string;
  tel: string;
  email: string;
  password: string;
  isActive: boolean;
  roles : Array<any>


  constructor(id: number,
              firstName: string,
              lastName: string,
              tel: string,
              password: string,
              email: string,
              isActive: boolean
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.tel = tel;
    this.email = email;
    this.password = password;
    this.isActive = isActive;
  }

}
