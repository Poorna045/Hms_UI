import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
declare var $;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  todaydate = new Date();
  dummy = false;


  db_date;
  db_month;
  db_year;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
  ) { }



  ngOnInit() {
    this._apiService.page = "dashboard";
    setTimeout(function () {
      $(function () {
        $("#sidebar-toggle").click(function (e) {
          e.preventDefault();
          $(".navbar-side").toggleClass("collapsed");
          $("#page-wrapper").toggleClass("collapsed");
        });
      });
    }, 1000)
    this.getlastInsertDate();
  }



  getlastInsertDate() {
    this._apiService.getlastInsertDate().subscribe(date => {
      console.log(date);
      if (date.success.data) {
        let date1 = date.data.data;
        this.db_date = localStorage.setItem('date', '');
        this.db_month = localStorage.setItem('month', '');
        this.db_year = localStorage.setItem('year', '');
        this.db_date = localStorage.setItem('date', date1.day);
        this.db_month = localStorage.setItem('month', date1.month);
        this.db_year = localStorage.setItem('year', date1.year);
      } else {
        //   disableSince: { year: this.todaydate.getFullYear(), month: this.todaydate.getMonth() + 1, day: this.todaydate.getDate() + 1 }
        this.db_date = localStorage.setItem('date', '');
        this.db_month = localStorage.setItem('month', '');
        this.db_year = localStorage.setItem('year', '');
        this.db_date = localStorage.setItem('date', this.todaydate.getFullYear().toString());
        this.db_month = localStorage.setItem('month', (this.todaydate.getMonth() + 1).toString());
        this.db_year = localStorage.setItem('year', (this.todaydate.getDate() + 1).toString());
      }

      //console.log(this._apiService.year);
    });

  }

}
