import {Component, OnInit} from '@angular/core';
import {GetApiService} from './services/get-api.service';
import {GetDevicesService} from './services/get-devices.service';
import {SensorData} from '../app/interfaces/sensor-data';
import {IMqttMessage} from 'ngx-mqtt';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  water_data: any[] = [];
  sensorData: SensorData[] = [];
  subscription = new Subscription();

  constructor(private api: GetApiService, private ap: GetDevicesService) {
  }

  ngOnInit() {
    this.subscribeToTopic();
  }

  retrieveData() {
    this.api.getSensorData().subscribe((data) => {
      console.log(data);
    });
  }

  getData(): void {
    this.api
      .getSensorData()
      .subscribe((sensorData) => (this.sensorData = sensorData));
  }

  devices() {
    this.ap.getDevices().subscribe((data) => {
      console.log(data);
    });
  }

  private subscribeToTopic() {
    this.subscription = this.api
      .topicWaterLevel()
      .subscribe((data: IMqttMessage) => {
        let item = JSON.parse(data.payload.toString());
        this.water_data.push(item);
      });
  }
}
