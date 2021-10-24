import { UserInfo } from './../register/model/UserInfo';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../user";
import {JwtService} from "../login/jwt.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../user.service";
import {ChangeUserInfoServiceService} from "./change-user-info-service.service";
import set = Reflect.set;

@Component({
  selector: 'app-change-user-info',
  templateUrl: './change-user-info.component.html',
  styleUrls: ['./change-user-info.component.css']
})
export class ChangeUserInfoComponent implements OnInit {

  infoFormGroup: FormGroup;
  user: User = new User(0,"","","","","",true);
  userEmail:string;
  userInfo: UserInfo;
  constructor(private fb: FormBuilder , private jwtService : JwtService,private router : Router,private toastrService : ToastrService,
              private userService: UserService, private changeUserInfo : ChangeUserInfoServiceService) {

    let jwt = localStorage.getItem("token");
    let jwtValue = JSON.parse(jwt)['jwt'];
    this.userEmail = this.jwtService.getEmail(jwtValue);

  }

  ngOnInit(): void {
    this.initForm();
    this.userService.getUserByEmail(this.userEmail)
      .subscribe(data=>{
        this.setForm(data);
        this.user = data;
      });

  }

  initForm() {
    this.infoFormGroup = this.fb.group({
      id : [0],
      lastName: ['' , [Validators.required]],
      firstName: [  '', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
 setForm(data: any){
    this.infoFormGroup.patchValue({'id' : data['id']? data['id'] : ''});
   this.infoFormGroup.patchValue({'lastName' : data['lastName']? data['lastName'] : ''});
    this.infoFormGroup.patchValue({'firstName' : data['firstName']? data['firstName'] : ''});
   this.infoFormGroup.patchValue({'email' : data['email']? data['email'] : ''});
   this.infoFormGroup.patchValue({'tel' : data['tel']? data['tel'] : ''});
 }

  get lastName() {
    return this.infoFormGroup.get('lastName');
  }

  get firstName() {
    return this.infoFormGroup.get('firstName');
  }

  get email() {
    return this.infoFormGroup.get('email');
  }

  get tel() {
    return this.infoFormGroup.get('tel');
  }

  save() {
    if(this.infoFormGroup.valid){
      this.user.id = this.infoFormGroup.get('id').value;
      this.user.email = this.email.value;
      this.user.firstName = this.firstName.value;
      this.user.lastName = this.lastName.value;
      this.user.tel = this.tel.value;
      this.changeUserInfo.changeUserInfo(this.user,this.userEmail)
        .subscribe(data=>{
          this.toastrService.success("Vos informations ont été changées avec succès", "Succès", { timeOut: 2000 });
          this.userInfo = JSON.parse(localStorage.getItem("token"));
          localStorage.setItem("token", JSON.stringify(new UserInfo(this.userInfo.jwt, this.user.firstName, this.user.lastName,this.user.email)));
          setTimeout(()=>{
           // this.router.navigateByUrl('menu/ok');
           window.location.reload();
          },2000);
          },(error)=>{
          if(error.error && error.error.status===409){
            this.toastrService.error("Un utilisateur utilsie déjà ce mail.","Email en cours d'utilisation",{timeOut:2000});
            this.email.reset();
            this.email.markAsTouched();
          }else{
            this.toastrService.error("Erreur lors de la modification de vos données.","Erreur",{timeOut:2000});
          }
        },()=>{
          if(this.userEmail!=this.user.email){
            this.toastrService.info("Veuillez vous reconnecter, car vous avez changé votre email.", "Info",{timeOut:2000});
            setTimeout(()=>{
              localStorage.clear();
              this.router.navigateByUrl('login');
            },2000);
          }
        })
    }else{
      this.infoFormGroup.reset();
    }
  }
}
