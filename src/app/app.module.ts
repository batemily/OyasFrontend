import { AddUserComponent } from './user-account/add-user/add-user.component';
import { RainChartsComponent } from './charts/rain-charts/rain-charts.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenuComponent} from './menu/menu.component';
import {RecoverpwUserComponent} from './recoverpw-user/recoverpw-user.component';
import {LogoutUserComponent} from './logout-user/logout-user.component';
import {AccueilComponent} from './accueil/accueil.component';
import {LoginComponent} from './login/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
//import { UserRegistrationService } from './user-registration.service';
import {RegisterComponent} from './register/register/register.component';
import {RegisterService} from './register/register.service';
import {GetApiService} from './services/get-api.service';
import {Menu2Component} from './menu2/menu2.component';
import {AddCapteurComponent} from './capteur/add-capteur/add-capteur/add-capteur.component';
import {UserAccountComponent} from './user-account/user-account.component';
import {IMqttServiceOptions, MqttModule} from 'ngx-mqtt';
import {environment as env} from '../environments/mqttEnvironment';
import {RequestInterceptor} from "./interceptor/request.interceptor";
import {ToastrModule, ToastrService} from "ngx-toastr";
import { CapteurComponent } from './capteur/capteur/capteur.component';
import {NgxPaginationModule} from "ngx-pagination";
import {DatePipe} from "@angular/common";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import { ChangeUserInfoComponent } from './change-user-info/change-user-info.component';

import { ChartsModule } from 'ng2-charts';
import { MessageService } from './accueil/message-service.service';


const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: env.mqtt.server,
  port: env.mqtt.port,
  protocol: env.mqtt.protocol === 'wss' ? 'wss' : 'ws',
  username: env.mqtt.username,
  password: env.mqtt.password,
  //path: '',
};

@NgModule({
  declarations: [
    AppComponent,
    //RegisterUserComponent,
    MenuComponent,
    RainChartsComponent,
    RecoverpwUserComponent,
    ChangePasswordComponent,
    LogoutUserComponent,
    AccueilComponent,
    LoginComponent,
    RegisterComponent,
    Menu2Component,
    AddCapteurComponent,
    UserAccountComponent,
    CapteurComponent,
    AddUserComponent,
    ChangeUserInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    NgxPaginationModule,

  ],
  providers: [RegisterService,MessageService, GetApiService ,  {
    provide : HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true
  },DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {
}
