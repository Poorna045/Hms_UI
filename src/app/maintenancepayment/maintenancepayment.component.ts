import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AppSettings } from '../app.settings';
import { Popup } from 'ng2-opd-popup';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-maintenancepayment',
  templateUrl: './maintenancepayment.component.html',
  styleUrls: ['./maintenancepayment.component.css']
})
export class MaintenancepaymentComponent implements OnInit {

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    private popup: Popup,
    public toasterService: ToasterService) { }


  complaints_Form = new FormGroup({
    complaint_type: new FormControl(),
    complaint_priority: new FormControl(),
    complaint_category_type: new FormControl(),
    feedback: new FormControl(),
  });


  ngOnInit() {
    this._apiService.page='maintenancepayment'
  }

  public toasterconfig: ToasterConfig =
  new ToasterConfig({

    showCloseButton: true,
    tapToDismiss: true,
    timeout: 5000

  });


  addpop() {
    this.toasterService.pop('success', '', " You Request was Succesful !");
  }

  addComplaints(value) {
    value.reg_no = localStorage.getItem('reg_no');
    console.log(value, 'value');
    this._apiService.addComplaints(value).subscribe(update => {
      this.complaints_Form.reset();
      this.addpop();
    });
  }
}
