
import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { ApiService } from '../services/api.service';
import { AppSettings } from '../app.settings';
import { Popup } from 'ng2-opd-popup';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector   : 'app-roomtype',
  templateUrl: './roomtype.component.html',
  styleUrls  : ['./roomtype.component.css']
})
export class RoomtypeComponent implements OnInit {
  typeid  : any;
  roomType: any;
  public filterQuery = "";
  public rowsOnPage  = 5;
  public sortBy      = "";
  public sortOrder   = "asc";

  public toasterconfig: ToasterConfig = 
  new ToasterConfig({

    showCloseButton: true,
    tapToDismiss   : true,
    timeout        : 5000

  });
  public toasterService: ToasterService;
  constructor(private _router: Router,
    private _route        : ActivatedRoute,
    private _apiService   : ApiService,
    private popup         : Popup,
            toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  @ViewChild('popup3') popup3: Popup;

  addForm = new FormGroup({
    type      : new FormControl(),
    totalcount: new FormControl(),
    cost      : new FormControl(),
    totaldues : new FormControl()
  });
  editForm = new FormGroup({
    type      : new FormControl(),
    totalcount: new FormControl(),
    cost      : new FormControl(),
    totaldues : new FormControl()
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


  ngOnInit() {
    this._apiService.page = "roomtype";
    this._apiService.getRoomType().subscribe(data => {
      console.log(data.data);
      this.roomType = data.data;
    });
  }

  addRoomType(value) {
    console.log(value, 'value');
    this._apiService.addRoomType(value).subscribe(add => {
      if (add.data != 'already exists') {
        this._apiService.getRoomType().subscribe(data => {
          console.log(data.data);
          this.roomType = data.data;
          this.popup1.hide();
          this.addpop();
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
        this.roomType = data.data;
        this.popup3.hide();
        this.delpop();
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
      header           : "Add Room Type",
      color            : "#2c3e50",                      // red, blue.... 
      widthProsentage  : 40,                             // The with of the popou measured by browser width 
      animationDuration: 1,                              // in seconds, 0 = no animation 
      showButtons      : true,                           // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Add",                          // The text on your confirm button 
      cancleBtnContent : "Cancel",                       // the text on your cancel button 
      confirmBtnClass  : "btn btn-default btn-square",   // your class for styling the confirm button 
      cancleBtnClass   : "btn btn-danger btn-square",    // you class for styling the cancel button 
      animation        : "fadeInDown",                   // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup1.show(this.popup1.options);
  }
  edit(dt) {
    // this.popup.show();
    // this.editForm.type  = dt;
    this.editForm.patchValue(dt);
    this.typeid = dt.typeid;

    this.popup2.options = {
      header           : "Edit Room Type",
      color            : "#2c3e50",                      // red, blue.... 
      widthProsentage  : 40,                             // The with of the popou measured by browser width 
      animationDuration: 1,                              // in seconds, 0 = no animation 
      showButtons      : true,                           // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Edit",                         // The text on your confirm button 
      cancleBtnContent : "Cancel",                       // the text on your cancel button 
      confirmBtnClass  : "btn btn-primary btn-square",   // your class for styling the confirm button 
      cancleBtnClass   : "btn btn-danger btn-square",    // you class for styling the cancel button 
      animation        : "fadeInDown",                   // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup2.show(this.popup2.options);
  }
  delete(dt) {
    // this.popup.show();
    this.typeid         = dt.typeid;
    this.popup3.options = {
      header           : "Delete Room Type",
      color            : "#2c3e50",                      // red, blue.... 
      widthProsentage  : 40,                             // The with of the popou measured by browser width 
      animationDuration: 1,                              // in seconds, 0 = no animation 
      showButtons      : true,                           // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Delete",                       // The text on your confirm button 
      cancleBtnContent : "Cancel",                       // the text on your cancel button 
      confirmBtnClass  : "btn btn-warning btn-square",   // your class for styling the confirm button 
      cancleBtnClass   : "btn btn-danger btn-square",    // you class for styling the cancel button 
      animation        : "fadeInDown",                   // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup3.show(this.popup3.options);
  }
  // YourConfirmEvent() {
  //   alert('You cliked confirm');
  // }

}