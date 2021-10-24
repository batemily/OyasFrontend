import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";


@Injectable()
export class RequestInterceptor implements HttpInterceptor{
  constructor(private toastrService : ToastrService, private router: Router){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let jwt = localStorage.getItem('token');
    if (jwt != null) {
      let jwtValue = JSON.parse(jwt)['jwt'];
      if(!req.url.includes('resetPassword') && !req.url.includes('login') && !req.url.includes('register')){
        req = req.clone({
          headers : req.headers.set('Authorization', 'Bearer '+jwtValue)
        });
      }
    }else if(!req.url.includes('resetPassword') && !req.url.includes('login') && !req.url.includes('register')){
      this.toastrService.warning("Session Expirée, Veuillez vous reconnecter.", "Session Expirée",{timeOut : 1800});
      setTimeout(()=>{
        localStorage.clear();
        this.router.navigateByUrl('login');
      },2000);
    }
    return next.handle(req);
  }

}
