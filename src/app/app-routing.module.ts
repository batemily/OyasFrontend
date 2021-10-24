import { AddUserComponent } from './user-account/add-user/add-user.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login/login.component';
import {RegisterComponent} from './register/register/register.component';
import {MenuComponent} from './menu/menu.component';
import {RecoverpwUserComponent} from './recoverpw-user/recoverpw-user.component';
import {LogoutUserComponent} from './logout-user/logout-user.component';
import {UserAccountComponent} from "./user-account/user-account.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {CapteurComponent} from "./capteur/capteur/capteur.component";
import {AddCapteurComponent} from "./capteur/add-capteur/add-capteur/add-capteur.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ChangeUserInfoComponent} from "./change-user-info/change-user-info.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'logout-user',
    component: LogoutUserComponent,
  },
  {
    path: 'recoverpw-user',
    component: RecoverpwUserComponent,
  },
  {
    path: 'menu',
    component: MenuComponent,
    children : [
      {
        path: 'accueil',
        component: AccueilComponent,
      },
      {
        path : 'users',
        component : UserAccountComponent
      },

      {
        path: 'capteurs',
        component: CapteurComponent,
      },
      {
        path: 'add-capteur',
        component: AddCapteurComponent,
      },
      {
        path: 'add-user',
        component: AddUserComponent,
      },
      {
        path: 'edit-user/:id',
        component: AddUserComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'change-user-info',
        component: ChangeUserInfoComponent,
      },
      {

        path: '**',
        redirectTo: 'accueil',
        pathMatch: 'full'
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
