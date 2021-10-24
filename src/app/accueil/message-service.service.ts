import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl = 'http://localhost:8081/api/sendMail';

  constructor(private http: HttpClient) { }

  sendMessage(message:string,recipientMail:string) : Observable<any>{
    return this.http.get(this.baseUrl+"?message="+message+"&recipientMail="+recipientMail);
  }

  getData() : Observable<any>{
    return this.http.get(this.baseUrl+"/data");
  }
}
