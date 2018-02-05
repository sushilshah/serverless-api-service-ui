import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Http } from '@angular/http';

declare function require(path: string): any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: any = 'Sushil';
  title = 'app';

  deviceCount: number;
  alertCount: number;

  constructor(private http: Http,
  private router: Router) {
}

  ngOnInit() {
    require('../../../../assets/js/charts.js')();
    this.getUserCount();
    this.getAlertCount();
  }

  getUserCount() {
    this.http.get( 'https://gzohp9nx5g.execute-api.ap-southeast-2.amazonaws.com/dev/devices')
    .subscribe(data => {
        let response = data.json();
        this.deviceCount = response.length;
    }, err => {
        console.log(err);
    });
  }
  getAlertCount() {
    this.http.get( 'https://gzohp9nx5g.execute-api.ap-southeast-2.amazonaws.com/dev/alerts')
    .subscribe(data => {
        let response = data.json();
        this.alertCount = response.length;
    }, err => {
        console.log(err);
    });
  }
}
