import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SensorData} from '../interfaces/sensor-data';
import {IMqttMessage, MqttService} from 'ngx-mqtt';

@Injectable({
  providedIn: 'root',
})
export class GetApiService {
  appKey = 'key ttn-account-v2.g7M2c9s1lvj-ySg3cAc-CmAJw0thqRSFxrjFd3k7AVY';
  aPI = 'https://sensorultra.data.thethingsnetwork.org/api/v2/query';
  endPoint = 'sensorultra/devices';
  //sensor1/up"
  deviceId = 'sensor1';
  messageType = 'up';

  constructor(private http: HttpClient, private mqttService: MqttService) {
  }

  topicWaterLevel(): Observable<IMqttMessage> {
    let topicName = `${this.endPoint}/${this.deviceId}/${this.messageType}`;
    return this.mqttService.observe(topicName);
  }

  getSensorData(): Observable<SensorData[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.appKey,
      }),
    };
    return this.http.get<SensorData[]>(this.aPI, httpOptions);
  }
}
