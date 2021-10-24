import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterRequest} from '../model/register-request';
import {RegisterService} from '../register.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  [x: string]: any;

  formGroup!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private toastrService: ToastrService
  ) {
  }

  get lastname() {
    return this.formGroup.get('lastname');
  }

  get firstname() {
    return this.formGroup.get('firstname');
  }

  get email() {
    return this.formGroup.get('email');
  }

  get password() {
    return this.formGroup.get('password');
  }

  get passwordd() {
    return this.formGroup.get('passwordd');
  }

  get tel() {
    return this.formGroup.get('tel');
  }

  /* ngOnInit(): void {
  }*/
  ngOnInit() {
    this.infoForm();
  }

  infoForm() {
    this.formGroup = this.fb.group({
      lastname: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      //pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. ]*(\\{3})[-. ]*(\\d{4})(?: *x(\\d+))'
      password: ['', [Validators.required, Validators.minLength(2)]],
      passwordd: ['', [Validators.required, Validators.minLength(2)]],
      tel: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  /*register(){
    let registerRequest = new RegisterRequest(this.formGroup.value.lastname, this.formGroup.value.firstname,
      this.formGroup.value.email, this.formGroup.value.tel,
      this.formGroup.value.password, );
    this.registerService.login(registerRequest);*/
  register() {
    if (this.formGroup.value.password !== this.formGroup.value.passwordd) {
      //('Your passwords do not match.');
      alert('Your passwords do not match.');

      return;
    }
    let req = new RegisterRequest(
      this.formGroup.value.lastname,
      this.formGroup.value.firstname,
      this.formGroup.value.email,
      this.formGroup.value.password,
      //this.formGroup.value.passwordd,
      this.formGroup.value.tel
    );
    this.registerService.register(req).subscribe(
      (value) => {
        this.processing = false;
        this.isLoggingIn = true;
        this.toastrService.success("Utilisateur enregistré avec succès", "Enregistrement");
        setTimeout(()=>{
          this.router.navigateByUrl('login');
        },1500);
      },
      (error) => {
        this.processing = false;
        this.toastrService.error("Erreur survenue lors de l'enregistrement de l'utilisateur", "Erreur");
      }
    );

    /*ResetForm() {
            this.crudApi.dataForm.reset();
        }
        onSubmit() {

          if (this.crudApi.dataForm.value.password == this.crudApi.dataForm.value.passwordd)
          {
            if (this.crudApi.choixmenu == "A")
            {
              this.addData();
            }
            else
            {
             this.updateData()
            }
          }
          else
          {
            this.toastr.warning( 'Vérifiet votre de passe ...');
          }
      }*/
  }
}
