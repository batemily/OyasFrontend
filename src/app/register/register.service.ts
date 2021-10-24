import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegisterRequest} from './model/register-request';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  // constructor() { }
  url = 'http://localhost:8081/';

  constructor(private http: HttpClient) {
  }

  public register(registerRequest: RegisterRequest): Observable<any> {
    return this.http.post(this.url + 'api/register', registerRequest);
  }

  public getUsers() {
    return this.http.get(this.url + 'api/users/getAllUsers');
  }

  public getUserByEmail(email: string) {
    return this.http.get(this.url + 'api/users/findUser/' + email);
  }

  public deleteUser(id: string) {
    return this.http.delete(this.url + 'api/users/cancel/' + id);
  }

}
