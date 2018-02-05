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

  userCount: number;

  constructor(private http: Http,
  private router: Router) {
}

  ngOnInit() {
    require('../../../../assets/js/charts.js')();
    this.getUserCount();
  }

  getUserCount() {
    this.http.get( 'https://djvp2idgi0.execute-api.ap-south-1.amazonaws.com/dev/users')
    .subscribe(data => {
        let response = data.json();
        this.userCount = response.length;
    }, err => {
        console.log(err);
    });
}

}
