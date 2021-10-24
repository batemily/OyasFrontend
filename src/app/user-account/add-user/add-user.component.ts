import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterService} from "../../register/register.service";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../user.service";
import {User} from "../../user";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  userFormGroup: FormGroup;
  isUpdateMode : boolean;
  id:number;
  user : any
  constructor( private fb: FormBuilder,
               private userService: UserService,
               private toastrService: ToastrService,private  router: Router , private activatedRoute : ActivatedRoute) {

        this.activatedRoute.params.subscribe(param=>{
          this.id = +param.id;
        });
        this.isUpdateMode = this.id>0;

  }

  ngOnInit(): void {
    this.initForm();
    if(this.isUpdateMode){
      this.userService.getUserById(this.id)
        .subscribe((data)=>{
          this.setUserForm(data);
          this.user = data;
        })
    }

  }


  setUserForm(data: any){
    this.userFormGroup.patchValue({'id' : data['id']? data['id'] : ''});
    this.userFormGroup.patchValue({'lastName' : data['lastName']? data['lastName'] : ''});
    this.userFormGroup.patchValue({'firstName' : data['firstName']? data['firstName'] : ''});
    this.userFormGroup.patchValue({'password' : data['password']? data['password'] : ''});
    this.userFormGroup.patchValue({'email' : data['email']? data['email'] : ''});
    this.userFormGroup.patchValue({'tel' : data['tel']? data['tel'] : ''});
  }
  initForm() {
    this.userFormGroup = this.fb.group({
      id : [0],
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      email: [{ value: '', disabled: this.isUpdateMode }, {
        validators: [Validators.required, Validators.email],
      }],
      password: [{ value: '', disabled: this.isUpdateMode }, {
        validators: [Validators.required, Validators.minLength(8)],
      }],
      confirmPassword: [{ value: '', disabled: this.isUpdateMode }, {
        validators: [Validators.required, Validators.minLength(8)],
      }],
      tel: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get lastName() {
    return this.userFormGroup.get('lastName');
  }

  get firstName() {
    return this.userFormGroup.get('firstName');
  }

  get email() {
    return this.userFormGroup.get('email');
  }

  get password() {
    return this.userFormGroup.get('password');
  }

  get confirmPassword() {
    return this.userFormGroup.get('confirmPassword');
  }

  get tel() {
    return this.userFormGroup.get('tel');
  }

  save() {
    if (this.userFormGroup.value.password !== this.userFormGroup.value.confirmPassword) {
      alert('Les mots de passe doivent être les mêmes.');
      return;
    }
    if(this.userFormGroup.valid){
      let user: User = this.userFormGroup.getRawValue();
      if(!this.isUpdateMode){
        user.isActive=true;
        this.userService.createUser(user).subscribe(data=>{
          this.toastrService.success("Utilisateur ajouté avec succès", "Ajout Utilisateur");
          setTimeout(()=>{
            this.router.navigateByUrl('menu/users');
          },2000);
        },(error)=>{
          this.toastrService.error("Erreur lors de l'ajout de l'utilisateur", "Erreur");
        });
      }else{

        user.roles = this.user['roles'];
        user.isActive = this.user['isActive'];
        this.userService.updateUser(user.id,user).subscribe(data=>{
          this.toastrService.success("Mise à jour effectuée avec succès", "Modification Utilisateur");
          setTimeout(()=>{
            this.router.navigateByUrl('menu/users');
          },2000);
        },(error)=>{
          this.toastrService.error("Erreur lors de la modification de l'utilisatuer", "Erreur");
        })
      }
    }else{
      this.userFormGroup.reset();
    }
  }
}
