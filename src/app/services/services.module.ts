import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, Response } from '@angular/http';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ServicesModule {
 
  deviceCount: number;
  devices: any;

  constructor(private http: Http) {}
  
    getUserCount() {
    this.http.get( 'https://gzohp9nx5g.execute-api.ap-southeast-2.amazonaws.com/dev/devices')
    .subscribe(data => {
        let response = data.json();
        this.deviceCount = response.length;
        this.devices = response;
    }, err => {
        console.log(err);
    });
  }

    getDevice(deviceId) {
    return this.http.get( 'https://gzohp9nx5g.execute-api.ap-southeast-2.amazonaws.com/dev/devices/' + deviceId )
    .map(
      (response: Response) => response.json()
      );
    }
  getDeviceReadings(deviceId) {
    return this.http.get( 'https://gzohp9nx5g.execute-api.ap-southeast-2.amazonaws.com/dev/devices/' + deviceId )
    .map(
      (response: Response) => response.json()
  );
    // .subscribe(data => {
    //     let response = data.json();
    //     this.deviceCount = response.length;
    //     this.devices = response;
    // }, err => {
    //     console.log(err);
    // });
  }

 }
