import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {JwtService} from './jwt.service';
import {LoginRequest} from './model/login-request';
import {ToastrService} from "ngx-toastr";
import { UserInfo } from '../register/model/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class LoginService {



  url = 'http://localhost:8081/';

  constructor(private httpClient: HttpClient, private router: Router, private jwtService: JwtService, private toastrService : ToastrService) {
  }

  public login(loginRequest: LoginRequest): any {
    return this.httpClient.post(this.url + 'api/login', loginRequest)
      .subscribe(data => {

        localStorage.setItem("token", JSON.stringify(data));

        this.router.navigateByUrl('menu');
      },(error)=>{
        console.log(error)
        if(error.error && error.error.status===412){
          this.toastrService.error("Cet utilisateur est inactif", "Erreur", {timeOut:2500});
        }else{
          this.toastrService.error("Veuillez vérifier vos données.", "Erreur",{timeOut:2500});
        }
      });

  }


  public getAuthorities(): string [] {
    let jwt = localStorage.getItem("token");
    if (jwt != null) {
      let jwtValue = JSON.parse(jwt)['jwt'];
      let jwtDecoded = this.jwtService.decodeToken(jwtValue);
      let authorities = jwtDecoded['authorities'];
      return authorities;
    }
    return [];
  }

  public hasAuthority(authorityName: string): boolean {
    return this.getAuthorities().includes(authorityName);
  }
}
