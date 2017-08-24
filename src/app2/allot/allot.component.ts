import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { ApiService } from "../services/api.service";
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { Router, ActivatedRoute } from "@angular/router";
import { Popup } from "ng2-opd-popup";
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector   : 'app-allot',
  templateUrl: './allot.component.html',
  styleUrls  : ['./allot.component.css']
})
export class AllotComponent implements OnInit {
  typerooms = '';
  typeroom  = 'all';
  fullview  = new Object();
  reglist   = [];
  typelist  = [];

  bid: any;
  public filterQuery  = "";
  public rowsOnPage   = 5;
  public sortBy       = "";
  public sortOrder    = "asc";
         bookingslist = [];

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
    private fb            : FormBuilder,
    private popup         : Popup,
            toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  private myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd'
  };

  ngOnInit() {
    this._apiService.page = "allot";
    this._apiService.getRoomType().subscribe(list => {
      console.log(list); this.typelist = list.data; const val = { type: 'all' }
      this._apiService.getreglist(val).subscribe(lists => {
        console.log(list);
        this.reglist = lists.data;
      });

    })
  }

  getTypeof($event) {
    console.log($event.target.value);
    
                  this.typeroom = $event.target.value;

    const val = {
      type: $event.target.value
    }
    this._apiService.getreglist(val).subscribe(list => {
      console.log(list);

      this.reglist = list.data;
    });
  }

   getTypeof2($event) {
    console.log($event.target.value);
  this.typerooms = $event.target.value;
  }
  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
  }

  newForm = new FormGroup({
    startdate   : new FormControl(),
    enddate     : new FormControl(),
    description : new FormControl(),
    semstartdate: new FormControl(),
    semenddate  : new FormControl()

  });
  editForm = new FormGroup({
    startdate   : new FormControl(),
    enddate     : new FormControl(),
    description : new FormControl(),
    semstartdate: new FormControl(),
    semenddate  : new FormControl()

  });

  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  @ViewChild('popup3') popup3: Popup;
  @ViewChild('popup4') popup4: Popup;

  add() {

    this.newForm.reset()

    this.popup1.options = {
      header           : "Add New Booking",
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
    this.fullview  = dt;
    this.typerooms = 'AC';

    this.popup2.options = {
      header           : "Edit Booking",
      color            : "#2c3e50",                     // red, blue.... 
      widthProsentage  : 40,                            // The with of the popou measured by browser width 
      animationDuration: 1,                             // in seconds, 0 = no animation 
      showButtons      : false,                         // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Edit",                        // The text on your confirm button 
      cancleBtnContent : "Cancel",                      // the text on your cancel button 
      confirmBtnClass  : "btn btn-info btn-square",     // your class for styling the confirm button 
      cancleBtnClass   : "btn btn-danger btn-square",   // you class for styling the cancel button 
      animation        : "fadeInDown",                  // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup2.show(this.popup2.options);
  }

  hide() {
    this.popup1.hide();
    this.popup2.hide();
    this.popup3.hide();
    this.popup4.hide();
  }

  view(dt) {
    this.fullview       = dt;
    this.popup4.options = {
      header           : "Student Info !",
      color            : "#2c3e50",                     // red, blue.... 
      widthProsentage  : 60,                            // The with of the popou measured by browser width 
      animationDuration: 1,                             // in seconds, 0 = no animation 
      showButtons      : false,                         // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Edit",                        // The text on your confirm button 
      cancleBtnContent : "Ok",                          // the text on your cancel button 
      confirmBtnClass  : "btn btn-info btn-square",     // your class for styling the confirm button 
      cancleBtnClass   : "btn btn-danger btn-square",   // you class for styling the cancel button 
      animation        : "fadeInDown",                  // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup4.show(this.popup4.options);
  }
  delete(dt) {
    // this.popup.show();
    this.bid            = dt.bid;
    this.popup3.options = {
      header           : "Delete Booking",
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

  popToast() {
    this.toasterService.pop('warning', '', 'Bookings are already opened on those days . please verify');
    console.log('workings');


  }

  addpop() {
    this.toasterService.pop('success', '', " Succesfully Added New Booking !");
  }
  editpop() {
    this.toasterService.pop('success', '', " Your Booking Changes are Succesful");
  }
  delpop() {
    this.toasterService.pop('success', '', " Your Booking Deletion is Succesful");
  }

  popToast2() {
    this.toasterService.pop('warning', '', 'Please fill all the feilds');

  }
  addBooking(value) {
    console.log(value, 'value');
    console.log(value.startdate);

    this._apiService.addBooking(value).subscribe(add => {
      this._apiService.getboolkingslist().subscribe(bookings => {
        this.bookingslist = bookings.data;
        this.popup1.hide();
        this.addpop();
      })

    });
  }
  addstudent() {
// this.fullview["newtype"] = this.typeroom;
if(this.typeroom =='all'){
this.fullview["type"] = this.typerooms;
}
console.log(this.fullview);

    this._apiService.vacantroom(this.fullview).subscribe(add => {
      this._apiService.getRoomType().subscribe(list => {
        console.log(list); this.typelist = list.data; const val = { type: 'all' }
        this._apiService.getreglist(val).subscribe(lists => {
          console.log(list);
          this.reglist = lists.data;
          this.popup2.hide();
          this.editpop();
        });

      })
    });
  }

  deletebookings() {
    const value = {
      bid: this.bid
    }
    this._apiService.deleteBooking(value).subscribe(deletes => {
      this._apiService.getRoomType().subscribe(list => {
        console.log(list); this.typelist = list.data; const val = { type: 'all' }
        this._apiService.getreglist(val).subscribe(lists => {
          console.log(list);
          this.reglist = lists.data;
          this.popup3.hide();
          this.delpop();
        });

      })

    });
  }
}
