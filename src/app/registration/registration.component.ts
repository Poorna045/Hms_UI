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
  registerid='';
  change = false;
  studsDataN = [];
  selectedhosteldata = [];
  utypes = '';
  hid = 'all';
  hostelsdata = [];
  reg_no: any;
  studsData = [];
  roomType = [];
  utype = '';
  hlpriority = false
  priority = false;
  studentname = localStorage.getItem('name');
  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
    private popup: Popup,
    public toasterService: ToasterService) { }
  Roomtypes = [];
  showusers = []

  dropdownSettings = {};

  reg_Form = new FormGroup({
    studentname: new FormControl(),
    reg_no: new FormControl(),
    hostellocation: new FormControl(),
    locationpriority: new FormControl(),
    roomtype: new FormControl(),
    typepriority: new FormControl(),
    utype: new FormControl()
  });


  public toasterconfig: ToasterConfig =
  new ToasterConfig({

    showCloseButton: true,
    tapToDismiss: true,
    timeout: 5000

  });

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd'
  };

  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
  }

  getuserdata(utype) {
    this.utypes = utype;
    this._apiService.getUsersDataR({ utype: utype }).subscribe(dat => {
      console.log(dat);
      this.studsDataN = dat.data;
      this.studsData = [];
      for (var i = 0; i < dat.data.length; i++) {
        this.studsData[i] = new Object();
        this.studsData[i].id = dat.data[i].reg_no;
        this.studsData[i].itemName = dat.data[i].firstname + ' - ' + dat.data[i].reg_no;
      }

    });
    this.showusers = [];

    if (this.utype == 'adm') {
      this.reg_Form.patchValue({
        studentname: ''
      });
    }

  }

  addpop() {
    this.toasterService.pop('success', '', " Your Registration Was Succesful !");
  }

  addpop2() {
    this.toasterService.pop('success', '', " Your Changes Was Succesful !");
  }


  popToast2() {
    this.toasterService.pop('warning', '', 'Please fill all the feilds');

  }

  ngOnInit() {
    this.reg_no = localStorage.getItem('reg_no');
    this._apiService.page = 'registration'
    this.utype = localStorage.getItem('utype');
    this.reg_Form.patchValue({ utype: 'std' });

    this._apiService.gethostelconfig().subscribe(dat => {
      console.log(dat, 'hostels list');
      this.hostelsdata = dat.data;
      this.selectedhosteldata = dat.data;

      if (this.utype != 'adm') {
        this._apiService.getvalidtest({
          reg_no: this.reg_no,
        }).subscribe(dataas => {
          console.log(dataas, 'valid test');
          if (dataas.data.length > 0) {
            this.change = true;
            this.registerid=dataas.data[0].registerid;
          }
        })
      }


      this.getuserdata('std');

      if (this.utype != 'adm') {
        this.reg_Form.patchValue({
          studentname: this.studentname,
          reg_no: this.reg_no,
          utype: this.utype
        });

        this.selectedhosteldata = this.hostelsdata;

        // console.log(res,' res test ',this.studsDataN);

        if (localStorage.getItem('gender') == 'M') {
          this.selectedhosteldata = this.hostelsdata.filter(function (obj) {
            return obj.hosteltype == 'Boys';
          });
        } else if (localStorage.getItem('gender') == "F") {
          this.selectedhosteldata = this.hostelsdata.filter(function (obj) {
            return obj.hosteltype == 'Girls';
          });

        }
        this.hid = this.selectedhosteldata[0].hid

        this.reg_Form.patchValue({
          hostellocation: this.selectedhosteldata[0].hid
        });
      }
    })
    this.getRoomType();

    this.dropdownSettings = {
      singleSelection: true,
      text: "Select ",
      enableSearchFilter: true,
      classes: "myclass custom-class",
    };



  }



  onItemSelect(item: any) {
    console.log(item);
    this.selectedhosteldata = this.hostelsdata;
    var res = this.studsDataN.filter(function (obj) {
      return obj.reg_no == item.id;
    });
    console.log(res, ' res test ', this.studsDataN);


    if (res[0]['gender'] == 'M') {
      this.selectedhosteldata = this.hostelsdata.filter(function (obj) {
        return obj.hosteltype == 'Boys';
      });
    } else if (res[0]['gender'] == "F") {
      this.selectedhosteldata = this.hostelsdata.filter(function (obj) {
        return obj.hosteltype == 'Girls';
      });

    }
    this.reg_Form.patchValue({
      studentname: item.itemName,
      hostellocation: this.selectedhosteldata[0].hid,
      locationpriority: this.selectedhosteldata[0].hid,
    });
    this.hid = this.selectedhosteldata[0].hid
    this.getRoomType();
    this.priority = false;
    this.hlpriority = false;

  }

  OnItemDeSelect(item: any) {
    console.log(item);
    this.selectedhosteldata = this.hostelsdata
    this.reg_Form.patchValue({
      studentname: ''
    });
  }
  //dropdown hide and show 

  RoomChange($event) {
    console.log($event);
    let value = $event.srcElement.value;
    if (value == 'all') {
      this.reg_Form.patchValue({
        typepriority: this.roomType[0].typeid
      });
      this.priority = true;
    } else {
      this.reg_Form.patchValue({
        typepriority: $event.srcElement.value
      });
      this.priority = false;
    }
    // console.log($event.srcElement.value);

  }

  addRegistrtion(value) {
    console.log(value, 'submit registration');
    if (this.utype == 'adm') {
      value.reg_no = value.reg_no[0].id;
    }
    value['registeredtype'] = localStorage.getItem('utype');

    this._apiService.addRegistrtion(value).subscribe(add => {

      console.log(add, 'regiter testing');

      this.addpop();
      this.reg_Form.reset();
      this.getuserdata(this.utypes);
      this.reg_Form.patchValue({
        utype: this.utypes
      });

    });
  }

  getRoomType() {
    this._apiService.getRoomType().subscribe(data => {
      console.log(data.data);
      this.roomType = [];
      if (this.hid == 'all') {
        this.roomType = data.data;
      } else {
        for (var i = 0; i < data.data.length; i++) {
          if (data.data[i].hostels.split(',').indexOf(this.hid) > -1) {
            console.log(true);
            this.roomType.push(data.data[i]);

          }
        }

      }
      this.reg_Form.patchValue({
        roomtype: this.roomType[0].typeid,
        typepriority: this.roomType[0].typeid,
        hostellocation: this.hid,
        locationpriority: this.hid,

      });

    });
  }

  hostelChange(val) {
    this.hid = val;
    if (val == 'all') {
      this.hlpriority = true;
      this.reg_Form.patchValue({
        locationpriority: this.selectedhosteldata[0].hid
      });
    } else {
      this.reg_Form.patchValue({
        locationpriority: val
      });
    }

    this.priority = false;
    this.getRoomType();
  }

  cancel() {
    this.reg_Form.reset();

    this.reg_Form.patchValue({
      utype: this.utypes
    });
  }
  changeRegis(value) {
    value['registerid']=this.registerid;
    console.log(value, 'change registration');

    this._apiService.changeRegistration(value).subscribe(change => {

      console.log(change, 'regiter testing');
      this.priority=false;
      this.addpop2();
    });
  }
}