import {DatePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  islogin = false;
  admin = false;
  suser = false;
  choixmenu: string = 'A';
  baseUrl = 'http://localhost:8081/api/users';
  /*listData : User[];
  public dataForm:  FormGroup;*/



  constructor(private http: HttpClient, private datePipe: DatePipe) {
  }


  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  unlockUser(user: User) : Observable<any> {
    return this.http.put(`${this.baseUrl+'/unlockUser'}`,user);
  }

  blockUser(user: User) : Observable<any> {
    return this.http.put(`${this.baseUrl+'/blockUser'}`,user);
  }

  getUserByEmail(email:string) : Observable<any>{
    return this.http.get(this.baseUrl+'/'+email);
  }

  getUserById(id:number) : Observable<any>{
    return this.http.get(this.baseUrl+'/by-id/'+id);
  }

  /*transformDate(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }*/
}
