
import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ApiService } from '../services/api.service';
import { AppSettings } from '../app.settings';
import { Popup } from 'ng2-opd-popup';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-roomtype',
  templateUrl: './roomtype.component.html',
  styleUrls: ['./roomtype.component.css']
})
export class RoomtypeComponent implements OnInit {
  statustype = '';
  hid = '';
  hostelname = '';
  hostelsdata2 = [];
  typeid: any;
  roomType: any;
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "";
  public sortOrder = "asc";
  hostelsdata = [];

  public toasterconfig: ToasterConfig =
  new ToasterConfig({

    showCloseButton: true,
    tapToDismiss: true,
    timeout: 5000

  });

  dropdownSettings = {};
  public toasterService: ToasterService;
  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
    private popup: Popup,
    toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  @ViewChild('popup3') popup3: Popup;
  @ViewChild('popup4') popup4: Popup;

  addForm = new FormGroup({
    type: new FormControl(),
    hostels: new FormControl()
  });
  editForm = new FormGroup({
    type: new FormControl(),
    totalcount: new FormControl(),
    cost: new FormControl(),
    totaldues: new FormControl(),
    hostels: new FormControl()
  });

  topForm = new FormGroup({
    hid: new FormControl(),

  });

  popToast() {
    this.toasterService.pop('warning', '', 'This RoomType is already exist . please enter unique Type');
    console.log('workings');


  }
  popToast2() {
    this.toasterService.pop('warning', '', 'Please fill all the feilds');

  }

  addpop() {
    this.toasterService.pop('success', '', " Succesfully Added New RoomType !");
  }
  editpop() {
    this.toasterService.pop('success', '', " Your Changes are Succesful");
  }
  delpop() {
    this.toasterService.pop('success', '', " Your Deletion is Succesful");
  }

  hide1() {
    this.popup1.hide();
  }

  getEnabledata(value) {
    var hid = value;
    this._apiService.getRoomType().subscribe(data => {
      console.log(data.data);


      this._apiService.gethostelconfig().subscribe(listss => {
        console.log(listss);
        this.hostelsdata = listss.data;
        this.hostelsdata2 = [];
        for (var j = 0; j < this.hostelsdata.length; j++) {
          this.hostelsdata2[j] = new Object();
          this.hostelsdata2[j]['id'] = this.hostelsdata[j].hid
          this.hostelsdata2[j]['itemName'] = this.hostelsdata[j].hostelname


          if (this.hostelsdata[j].hid == hid) {
            this.hostelname = this.hostelsdata[j].hostelname;
          }

        }

        this.hid = hid
        // var index=this.hostelsdata.indexOf(hid);

        console.log(hid, 'index test');
        for (var i = 0; i < data.data.length; i++) {
          if (data.data[i].hostels.split(',').indexOf(this.hid) > -1) {
            console.log(true);
            data.data[i]['status'] = 'enable';

          } else {
            data.data[i]['status'] = 'disable';
            console.log(false);
          }

        }
        this.roomType = data.data;
      });
    });

  }

  onItemSelect(item: any) {
    console.log(item);
    // this.reg_Form.reset();

  }

  OnItemDeSelect(item: any) {
    console.log(item);

  }

  ngOnInit() {
    this._apiService.page = "roomtype";
    this.dropdownSettings = {
      singleSelection: false,
      text: "Enable To ",
      enableSearchFilter: true,
      classes: "myclass custom-class",
    };
    this._apiService.getRoomType().subscribe(data => {
      console.log(data.data);


      this._apiService.gethostelconfig().subscribe(listss => {
        console.log(listss);
        this.hostelsdata = listss.data
        for (var j = 0; j < this.hostelsdata.length; j++) {
          this.hostelsdata2[j] = new Object();
          this.hostelsdata2[j]['id'] = this.hostelsdata[j].hid
          this.hostelsdata2[j]['itemName'] = this.hostelsdata[j].hostelname

        }
        this.hostelname = listss.data[0].hostelname
        this.hid = listss.data[0].hid
        this.topForm.patchValue({
          hid: listss.data[0].hid
        })
        for (var i = 0; i < data.data.length; i++) {
          if (data.data[i].hostels.split(',').indexOf(listss.data[0].hid) > -1) {
            console.log(true);
            data.data[i]['status'] = 'enable';

          } else {
            data.data[i]['status'] = 'disable';
            console.log(false);
          }

        }
        this.roomType = data.data;
      });
    });
  }

  addRoomType(value) {
    console.log(value, 'value');
    var data = [];
    for (var i = 0; i < value.hostels.length; i++) {
      data[i] = value.hostels[i].id

    }
    value.hostels = data.toString();
    console.log(value, 'value after test');


    this._apiService.addRoomType(value).subscribe(add => {
      if (add.data != 'already exists') {

        this._apiService.getRoomType().subscribe(data => {
          console.log(data.data);


          this._apiService.gethostelconfig().subscribe(listss => {
            console.log(listss);
            this.hostelsdata = listss.data;
            this.hostelsdata2 = [];

            for (var j = 0; j < this.hostelsdata.length; j++) {
              this.hostelsdata2[j] = new Object();
              this.hostelsdata2[j]['id'] = this.hostelsdata[j].hid
              this.hostelsdata2[j]['itemName'] = this.hostelsdata[j].hostelname


              if (this.hostelsdata[j].hid == this.hid) {
                this.hostelname = this.hostelsdata[j].hostelname;
              }

            }


            for (var i = 0; i < data.data.length; i++) {
              if (data.data[i].hostels.split(',').indexOf(this.hid) > -1) {
                console.log(true);
                data.data[i]['status'] = 'enable';

              } else {
                data.data[i]['status'] = 'disable';
                console.log(false);
              }

            }
            this.roomType = data.data;
            this.popup1.hide();
            this.addpop();
          });
        });
      } else {
        this.popToast();
      }
    });
  }

  deleteRoomType() {
    const value = {
      typeid: this.typeid
    }
    this._apiService.deleteRoomType(value).subscribe(deletes => {
      this._apiService.getRoomType().subscribe(data => {
        console.log(data.data);


        this._apiService.gethostelconfig().subscribe(listss => {
          console.log(listss);
          this.hostelsdata = listss.data;
          this.hostelsdata2 = [];

          for (var j = 0; j < this.hostelsdata.length; j++) {
            this.hostelsdata2[j] = new Object();
            this.hostelsdata2[j]['id'] = this.hostelsdata[j].hid
            this.hostelsdata2[j]['itemName'] = this.hostelsdata[j].hostelname


            if (this.hostelsdata[j].hid == this.hid) {
              this.hostelname = this.hostelsdata[j].hostelname;
            }

          }


          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].hostels.split(',').indexOf(this.hid) > -1) {
              console.log(true);
              data.data[i]['status'] = 'enable';

            } else {
              data.data[i]['status'] = 'disable';
              console.log(false);
            }

          }
          this.roomType = data.data;
          this.popup3.hide();
          this.delpop();
        });
      });
    });
  }



  editRoomType(value) {
    console.log(value, 'value');
    value.typeid = this.typeid;
    this._apiService.editRoomType(value).subscribe(edit => {
      this._apiService.getRoomType().subscribe(data => {
        console.log(data.data);
        this.roomType = data.data;
        this.popup2.hide();
        this.editpop();
      });
    });
  }


  add() {
    // this.popup.show();

    this.addForm.reset();
    this.popup1.options = {
      header: "Add Room Type",
      color: "#2c3e50",                      // red, blue.... 
      widthProsentage: 40,                             // The with of the popou measured by browser width 
      animationDuration: 1,                              // in seconds, 0 = no animation 
      showButtons: true,                           // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Add",                          // The text on your confirm button 
      cancleBtnContent: "Cancel",                       // the text on your cancel button 
      confirmBtnClass: "btn btn-info btn-sm btn-square",   // your class for styling the confirm button 
      cancleBtnClass: "btn btn-white btn-sm btn-square",    // you class for styling the cancel button 
      animation: "fadeInDown",                   // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup1.show(this.popup1.options);
  }
  edit(dt) {
    // this.popup.show();
    // this.editForm.type  = dt;
    this.editForm.patchValue(dt);
    this.typeid = dt.typeid;

    this.popup2.options = {
      header: "Edit Room Type",
      color: "#2c3e50",                      // red, blue.... 
      widthProsentage: 40,                             // The with of the popou measured by browser width 
      animationDuration: 1,                              // in seconds, 0 = no animation 
      showButtons: true,                           // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Edit",                         // The text on your confirm button 
      cancleBtnContent: "Cancel",                       // the text on your cancel button 
      confirmBtnClass: "btn btn-info btn-sm btn-square",   // your class for styling the confirm button 
      cancleBtnClass: "btn btn-white btn-sm btn-square",    // you class for styling the cancel button 
      animation: "fadeInDown",                   // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup2.show(this.popup2.options);
  }
  delete(dt) {
    // this.popup.show();
    this.typeid = dt.typeid;
    this.popup3.options = {
      header: "Delete Room Type",
      color: "#2c3e50",                      // red, blue.... 
      widthProsentage: 40,                             // The with of the popou measured by browser width 
      animationDuration: 1,                              // in seconds, 0 = no animation 
      showButtons: true,                           // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Delete",                       // The text on your confirm button 
      cancleBtnContent: "Cancel",                       // the text on your cancel button 
      confirmBtnClass: "btn btn-danger btn-sm btn-square",   // your class for styling the confirm button 
      cancleBtnClass: "btn btn-white btn-sm btn-square",    // you class for styling the cancel button 
      animation: "fadeInDown",                   // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup3.show(this.popup3.options);
  }

  statpop(type, dt) {
    // this.popup.show();
    this.statustype = type
    this.typeid = dt.typeid
    this.addForm.reset();
    this.popup4.options = {
      header: "Change Status",
      color: "#2c3e50",                      // red, blue.... 
      widthProsentage: 50,                             // The with of the popou measured by browser width 
      animationDuration: 1,                              // in seconds, 0 = no animation 
      showButtons: true,                           // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Submit",                          // The text on your confirm button 
      cancleBtnContent: "Cancel",                       // the text on your cancel button 
      confirmBtnClass: "btn btn-info btn-sm btn-square",   // your class for styling the confirm button 
      cancleBtnClass: "btn btn-white btn-sm btn-square",    // you class for styling the cancel button 
      animation: "fadeInDown",                   // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup4.show(this.popup4.options);
  }

  changestatus() {
    var hid = this.hid
    const val = {
      typeid: this.typeid,
      type: this.statustype,
      hid: this.hid
    }

    this._apiService.changeTypeStatus(val).subscribe(deletes => {
      this._apiService.getRoomType().subscribe(data => {
        console.log(data.data);


        this._apiService.gethostelconfig().subscribe(listss => {
          console.log(listss);
          this.hostelsdata = listss.data;
          for (var j = 0; j < this.hostelsdata.length; j++) {
            this.hostelsdata2[j] = new Object();
            this.hostelsdata2[j]['id'] = this.hostelsdata[j].id
            this.hostelsdata2[j]['itemName'] = this.hostelsdata[j].id


            if (this.hostelsdata[j].hid == hid) {
              this.hostelname = this.hostelsdata[j].hostelname;
            }

          }

          this.hid = hid
          // var index=this.hostelsdata.indexOf(hid);

          console.log(hid, 'index test');
          for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].hostels.split(',').indexOf(hid) > -1) {
              console.log(true);
              data.data[i]['status'] = 'enable';

            } else {
              data.data[i]['status'] = 'disable';
              console.log(false);
            }

          }
          this.roomType = data.data;
          this.popup4.hide();
          this.editpop();
        });
      });
    });
  }
}