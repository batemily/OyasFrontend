import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChangeUserInfoServiceService {

  baseUrl = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient) { }

  changeUserInfo(user:User,connectedUserMail:string) : Observable<any>{
    return this.http.put(this.baseUrl+'/changeUserInfo?connectedUserMail='+connectedUserMail,user);
  }
}
