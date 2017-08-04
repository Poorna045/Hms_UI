import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector   : 'app-studregis',
  templateUrl: './studregis.component.html',
  styleUrls  : ['./studregis.component.css']
})
export class StudregisComponent implements OnInit {

  constructor(private _apiService:ApiService) { }

  ngOnInit() {
    this._apiService.page = "registration";
  }


//   regform = new FormGroup({
//   startdate  : new FormControl(),
//   enddate    : new FormControl(),
//   description: new FormControl()

// });
addBooking(value){
  console.log(value.enddate._d.toDateString(),'value');
  
this._apiService.addBooking(value).subscribe(update=>{

});
}

}
