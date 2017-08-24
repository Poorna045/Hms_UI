import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { ApiService } from "../services/api.service";
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { Router, ActivatedRoute } from "@angular/router";
import { Popup } from "ng2-opd-popup";
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';


@Component({
  selector   : 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls  : ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
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
    this._apiService.page = "bookings";
    this._apiService.getboolkingslist().subscribe(bookings => {
      this.bookingslist = bookings.data;
    })
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
    // this.popup.show();

    this.editForm.patchValue({ startdate: { formatted: dt.startdate } });
    this.editForm.patchValue({ enddate: { formatted: dt.enddate } });
    this.editForm.patchValue({ semstartdate: { formatted: dt.semstartdate } });
    this.editForm.patchValue({ semenddate: { formatted: dt.semenddate } });
    this.editForm.patchValue({ description: dt.description });

    this.bid = dt.bid;

    this.popup2.options = {
      header           : "Edit Booking",
      color            : "#2c3e50",                     // red, blue.... 
      widthProsentage  : 40,                            // The with of the popou measured by browser width 
      animationDuration: 1,                             // in seconds, 0 = no animation 
      showButtons      : true,                          // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Edit",                        // The text on your confirm button 
      cancleBtnContent : "Cancel",                      // the text on your cancel button 
      confirmBtnClass  : "btn btn-info btn-square",     // your class for styling the confirm button 
      cancleBtnClass   : "btn btn-danger btn-square",   // you class for styling the cancel button 
      animation        : "fadeInDown",                  // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup2.show(this.popup2.options);
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
  editbookings(value) {
    console.log(value);
    value.bid = this.bid;

    this._apiService.editBooking(value).subscribe(update => {
      this._apiService.getboolkingslist().subscribe(bookings => {
        this.bookingslist = bookings.data;
        this.popup2.hide();
        this.editpop();
      })

    });
  }

  deletebookings() {
    const value = {
      bid: this.bid
    }
    this._apiService.deleteBooking(value).subscribe(deletes => {
      this._apiService.getboolkingslist().subscribe(bookings => {
        this.bookingslist = bookings.data;
        this.popup3.hide();
        this.delpop();
      })

    });
  }
}
