import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector   : 'app-feeconfig',
  templateUrl: './feeconfig.component.html',
  styleUrls  : ['./feeconfig.component.css']
})
export class FeeconfigComponent implements OnInit {

  constructor(public _apiService:ApiService) { }

  ngOnInit() {
    this._apiService.page = 'feeconfig';
  }

  feeconfigform = new FormGroup({
  roomtype   : new FormControl(),
  totaldues  : new FormControl(),
  totalamount: new FormControl(),
  // amt_perdue : new FormControl()

});

  submitfeeconfig(value){
    console.log(value);
    
    this._apiService.feeconfig(value).subscribe(feeconfig=>{});
  }
}
