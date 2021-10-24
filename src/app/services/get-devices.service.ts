import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetDevicesService {
  appKey = 'key ttn-account-v2.g7M2c9s1lvj-ySg3cAc-CmAJw0thqRSFxrjFd3k7AVY';
  aPI = 'https://sensorultra.data.thethingsnetwork.org/api/v2/devices';

  constructor(private http: HttpClient) {
  }

  getDevices() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.appKey,
      }),
    };
    return this.http.get(this.aPI, httpOptions);
  }
}
