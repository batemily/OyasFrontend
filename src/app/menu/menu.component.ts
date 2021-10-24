import {Component, OnInit} from '@angular/core';
import {LoginService} from '../login/login.service';
import {GetApiService} from '../services/get-api.service';
import {GetDevicesService} from '../services/get-devices.service';
import {SensorData} from '../interfaces/sensor-data';
import {Router} from "@angular/router";
import {JwtService} from "../login/jwt.service";
import { UserInfo } from '../register/model/UserInfo';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  sensorData: SensorData[] = [];
  title = 'frontend';
  isAdmin: boolean = false;
  userInfo: UserInfo;
  constructor(
    private api: GetApiService,
    private ap: GetDevicesService,
    private loginService: LoginService,
    private router: Router,
    private jwtService : JwtService
  ) {
    this.userInfo = JSON.parse(localStorage.getItem("token"));
  }

  // retrieveData() {
  //   this.api.getSensorData().subscribe((data) => {
  //     console.log(data);
  //   });

  ngOnInit() {
    this.isAdmin = this.loginService.hasAuthority('admin');
    this.getData();
      }

  // }
  getData(): void {
    this.api
      .getSensorData()
      .subscribe((sensorData) => (this.sensorData = sensorData));
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('logout-user');

  }
}
