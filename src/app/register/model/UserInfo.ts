export class UserInfo {
  jwt: string;
  nom: string;
  prenom: string;
  email: string;
  constructor(jwt: string, nom: string, prenom: string, email:string) {
    this.jwt = jwt;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
  }

}
