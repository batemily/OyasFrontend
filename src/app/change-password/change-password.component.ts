import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ChangePasswordRequest} from "./model/change-password-request";
import {JwtService} from "../login/jwt.service";
import {ChangePasswordService} from "./change-password.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm : FormGroup;

  constructor(private fb : FormBuilder, private router : Router , private jwtService: JwtService, private changePasswordService : ChangePasswordService,
              private toastrService : ToastrService) {
  }

  ngOnInit(): void {
    this.passwordForm = this.fb.group(
      {
        oldPassword : ['' , Validators.required],
        newPassword : ['' , Validators.required],
        confirmNewPassword : ['', Validators.required]
      }
    );
  }

  get oldPassword(){
    return this.passwordForm.get('oldPassword');
  }

  get newPassword(){
    return this.passwordForm.get('newPassword');
  }

  get confirmNewPassword(){
    return this.passwordForm.get('confirmNewPassword');
  }



  changePassword() {
    if(this.newPassword.value!=this.confirmNewPassword.value){
      alert('Les mots de passe doivent être les mêmes.');
      return;
    }
    let jwt = localStorage.getItem("token");
    let jwtValue = JSON.parse(jwt)['jwt'];
    let email = this.jwtService.getEmail(jwtValue);
    let changePasswordRequest = new ChangePasswordRequest(email,this.oldPassword.value,this.newPassword.value);
    this.changePasswordService.changePassword(changePasswordRequest)
      .subscribe(()=>{
        this.toastrService.success("Mot de passe changé avec succès", "Changement Mot de passe", {timeOut : 1800});
        setTimeout(()=>{
          this.router.navigateByUrl('menu/accueil');
        },2000)
      },(error)=>{

        if(error.error && error.error.status==412){
          this.oldPassword.reset();
          this.oldPassword.markAsDirty();
          this.toastrService.error("L'ancien mot de passe que vous avez saisi n'est pas correct", "Erreur");
        }
      })
  }
}
