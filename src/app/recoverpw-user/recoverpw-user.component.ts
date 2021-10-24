import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecoverpwUserService} from './recoverpw-user.service';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recoverpw-user',
  templateUrl: './recoverpw-user.component.html',
  styleUrls: ['./recoverpw-user.component.css']
})
export class RecoverpwUserComponent implements OnInit {

  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private recoverpwUserService: RecoverpwUserService, private toastrService : ToastrService,
              private router : Router) {
  }

  get email() {
    return this.formGroup.get('email');
  }

  ngOnInit(): void {
    this.infoForm();
  }

  infoForm() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  resetPassword() {
    this.recoverpwUserService.resetPassword(this.email.value).
      subscribe(()=>{
        this.toastrService.success('Un nouveau mot de passe a été généré pour vous, veuillez consulter votre mail.','Nouveau mot de passe');
    },(error)=>{
        this.toastrService.error('Erreur survenue lors de la création du nouveau mot de passe', 'Erreur');
    },()=>{
       this.formGroup.reset();
       setTimeout(()=>{
         this.router.navigateByUrl('login');
       },2000);
    });
  }
}
