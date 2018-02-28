import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesModule } from '../../../services/services.module';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {

  oneoftheaxis: number = 10;
  // oneoftheaxis: any = {"x_axis" : 10, "y_axis" : 11, "z_axis" : 12} ;
  constructor(private router: Router, 
    private serviceModule: ServicesModule) { }
  ngOnInit() {
    // private serviceModule: ServicesModule;
  }

  postData(data){
    console.log("data");
    console.log(data);
    this.serviceModule.postDevice(data);
  }
  goToDeviceDetails(deviceId) {
    // this.router.navigate(['device-details', deviceId]);

  }
}
