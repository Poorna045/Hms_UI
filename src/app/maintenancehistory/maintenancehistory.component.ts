import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AppSettings } from '../app.settings';
import { Popup } from 'ng2-opd-popup';
import { FormGroup, FormControl } from '@angular/forms';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { IMyDpOptions } from "mydatepicker";

@Component({
  selector: 'app-maintenancehistory',
  templateUrl: './maintenancehistory.component.html',
  styleUrls: ['./maintenancehistory.component.css']
})
export class MaintenancehistoryComponent implements OnInit {
  btype='all';
  totalbilldata = [];
  billtypeslist = [];

  billtype: any;
  bid: any;

  ctype = 'Hostel';
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "";
  public sortOrder = "asc";

  data = [];



  topForm = new FormGroup({
    billtype: new FormControl(),
    ctype: new FormControl(),

  });


  addForm = new FormGroup({
    billtype: new FormControl(),
    ctype: new FormControl(),
    description: new FormControl(),
    receipt_no: new FormControl(),
    cost: new FormControl(),
    paymentdate:new FormControl()
  });

  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;


  private myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd'
  };

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    private popup: Popup,
    public toasterService: ToasterService) {

  }



  ngOnInit() {
    this._apiService.page = 'maintenancehistory';

    this.topForm.patchValue({
      billtype: 'all',
      ctype:'Hostel'
    });

    this._apiService.getBillTypes().subscribe(lists => {
      console.log(lists);
      this.billtypeslist = lists.data;
      const value={
        billtype:'all',
        ctype:'Hostel'
      } 

      this.getMaintenaceData(value);
    });

  }

  submit(value) {

    console.log(value, 'top form submmited value');
     
    this.getMaintenaceData(value);


  }

  addpop() {
    this.toasterService.pop('success', '', " You Request was Succesful !");
  }

  existspop() {
    this.toasterService.pop('warning', '', " This Bill Type is Already Exists !");
  }


  public toasterconfig: ToasterConfig =
  new ToasterConfig({

    showCloseButton: true,
    tapToDismiss: true,
    timeout: 5000

  });

  add() {
    this.addForm.reset();
    this.popup1.options = {
      header: "Payment Details !",
      color: "#2c3e50",                      // red, blue.... 
      widthProsentage: 40,                             // The with of the popou measured by browser width 
      animationDuration: 1,                              // in seconds, 0 = no animation 
      showButtons: true,                           // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Submit",                          // The text on your confirm button 
      cancleBtnContent: "Cancel",                       // the text on your cancel button 
      confirmBtnClass: "btn btn-info btn-sm btn-square",   // your class for styling the confirm button 
      cancleBtnClass: "btn btn-white btn-sm btn-square",    // you class for styling the cancel button 
      animation: "fadeInDown",                   // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup1.show(this.popup1.options);
  }



  delete(dt) {
    this.bid = dt.bid;
    this.billtype = dt.billtype;
    this.popup2.options = {
      header: "Delete Bill Type",
      color: "#2c3e50",                      // red, blue.... 
      widthProsentage: 40,                             // The with of the popou measured by browser width 
      animationDuration: 1,                              // in seconds, 0 = no animation 
      showButtons: true,                           // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Delete",                          // The text on your confirm button 
      cancleBtnContent: "Cancel",                       // the text on your cancel button 
      confirmBtnClass: "btn btn-danger btn-sm btn-square",   // your class for styling the confirm button 
      cancleBtnClass: "btn btn-white btn-sm btn-square",    // you class for styling the cancel button 
      animation: "fadeInDown",                   // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup2.show(this.popup2.options);
  }

  getMaintenaceData(event) {
    console.log(event, '28');
    
    this.btype = event.billtype;
    this.ctype=event.ctype;
    this._apiService.getmaintenancedata(event).subscribe(lists => {
      console.log(lists, 'maintenance data');
      this.totalbilldata = lists.data;
      this.data=lists.data;

    });
  }

  addPayment(value) {
    console.log(value, 'send current Date also');
    value.reg_no = localStorage.getItem('reg_no');
    this._apiService.addpaymentData(value).subscribe(add => {
      console.log(add, 'add test popup');


      if (add.data == 'exists') {
        this.existspop();
      } else {

        this._apiService.getBillTypes().subscribe(lists => {
          console.log(lists);
          this.data = lists.data;
          this.addForm.reset();
          this.popup1.hide();
          this.addpop();
          const val={
            billtype:this.btype,
            ctype:this.ctype
          }
          this.getMaintenaceData(val);
        });
      }
    });
  }

  deleteBillType() {
    const value = {
      bid: this.bid
    }
    console.log(value, 'value');
    this._apiService.deleteBillType(value).subscribe(del => {
      console.log(del, 'add test popup');

      this._apiService.getBillTypes().subscribe(lists => {
        console.log(lists);
        this.data = lists.data;
        this.popup2.hide();
        this.addpop();
      });
    });
  }
}
