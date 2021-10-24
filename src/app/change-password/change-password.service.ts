import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtService} from "../login/jwt.service";
import {ToastrService} from "ngx-toastr";
import {ChangePasswordRequest} from "./model/change-password-request";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  baseUrl = 'http://localhost:8081/api/users';

  constructor(private httpClient: HttpClient, private router: Router) { }

  changePassword(changePasswordRequest : ChangePasswordRequest) : Observable<any>{
    return this.httpClient.put(this.baseUrl+'/changePassword',changePasswordRequest);
  }
}
