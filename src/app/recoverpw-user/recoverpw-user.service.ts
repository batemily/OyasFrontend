import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecoverpwUserService {

  baseUrl = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient) {
  }

  resetPassword(email:string) : Observable<any>{
    return this.http.get(this.baseUrl+'/resetPassword?email='+email);
  }
}
