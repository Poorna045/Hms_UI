import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AppSettings } from '../app.settings';
import { Popup } from 'ng2-opd-popup';
import { FormGroup, FormControl } from '@angular/forms';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  roomType: any;
  utype: any;
  studentname = localStorage.getItem('name');
  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    private popup: Popup,
  public toasterService: ToasterService) { }
  Roomtypes = [];
  reg_Form = new FormGroup({
    studentname: new FormControl(),
    dateofbirth: new FormControl(),
    registrationid: new FormControl(),
    reg_no: new FormControl(),
    genderT: new FormControl(),
    pwd: new FormControl(),
    distance: new FormControl(),
    roomtype: new FormControl(),
    priority: new FormControl(),
    fathername: new FormControl(),
    occupation: new FormControl(),
    parentmobile: new FormControl(),
    parentemail: new FormControl(),
    parentaddress: new FormControl(),
    permanentaddress: new FormControl(),
    guardianname: new FormControl(),
    guardianrelation: new FormControl(),
    guardianmobile: new FormControl(),
    guardianemail: new FormControl(),
    guardianaddress: new FormControl(),
    guardianpermanentaddress: new FormControl()
  });


  public toasterconfig: ToasterConfig =
  new ToasterConfig({

    showCloseButton: true,
    tapToDismiss: true,
    timeout: 5000

  });

  private myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd'
  };

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
  }


  addpop() {
    this.toasterService.pop('success', '', " Your Registration Was Succesful !");
  }
 

  popToast2() {
    this.toasterService.pop('warning', '', 'Please fill all the feilds');

  }

  ngOnInit() {
    this._apiService.page='registration'
    this.utype = localStorage.getItem('utype');
    if (this.utype == 'std') {
      this.reg_Form.patchValue({ studentname: this.studentname });
    }

    this.getRoomType();
  }



  //dropdown hide and show 
  priority = false;
  RoomChange($event) {
    console.log($event);
    let value = $event.srcElement.value;
    if (value == 'all') {
      this.priority = true;
    } else {
      this.priority = false;
    }
    // console.log($event.srcElement.value);

  }

  addRegistrtion(value) {
    if (this.utype == 'std')
      value.reg_no = localStorage.getItem('reg_no');

    if (value.roomtype != 'all') {
      value.priority = value.roomtype;
    }
    console.log(value, 'value');
    this._apiService.addRegistrtion(value).subscribe(update => {
      // this.popup1.hide();
      this.addpop();
      this.reg_Form.reset();

    });
  }

  getRoomType() {
    this._apiService.getRoomType().subscribe(data => {
      console.log(data.data);
      // if (data.data)
      this.roomType = data.data;
      // console.log(data.data, this.roomType);
    });
  }



}