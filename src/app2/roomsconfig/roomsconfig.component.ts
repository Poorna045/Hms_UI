import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { ApiService } from "../services/api.service";
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { Router, ActivatedRoute } from "@angular/router";
import { Popup } from "ng2-opd-popup";
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector   : 'app-roomsconfig',
  templateUrl: './roomsconfig.component.html',
  styleUrls  : ['./roomsconfig.component.css']
})
export class RoomsconfigComponent implements OnInit {
  hosteltype = 'Boys';
  roomtype   = '';
  roomsdata  = [];
  typerooms  = '';
  typeroom   = 'all';
  fullview   = new Object();
  reglist    = [];
  typelist   = [];

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
    this.topForm.patchValue({
  roomtype  : 'all',
  hosteltype: 'Boys'
});

    this._apiService.page = 'roomsconfig';

     this._apiService.getRoomType().subscribe(list => {
      console.log(list);
      this.typelist = list.data;

      const val = { rtype: 'all', htype: 'Boys' }

      this._apiService.getRoomsList(val).subscribe(lists => {
        console.log(lists);
        this.roomsdata = lists.data;
      });
    });

  }

  getTypeof($event) {
    console.log($event.target.value);

    this.typeroom = $event.target.value;

    const val = {
      type: $event.target.value,

    }
    this._apiService.getRoomsList(val).subscribe(lists => {
      console.log(lists);
      this.roomsdata = lists.data;
    });
  }

  submit(value) {
    console.log(value);
    this.roomtype   = value.roomtype;
    this.hosteltype = value.hosteltype;
    this._apiService.getRoomType().subscribe(list => {
      console.log(list);
      this.typelist = list.data;

      const val = { rtype: value.roomtype, htype: value.hosteltype }

      this._apiService.getRoomsList(val).subscribe(lists => {
        console.log(lists);
        this.roomsdata = lists.data;
      });
    });

  }
  getTypeof2($event) {
    console.log($event.target.value);
    this.typerooms = $event.target.value;
  }
  getHstType($event) {
    console.log($event.target.value);


  }
  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
  }

  topForm = new FormGroup({
    roomtype  : new FormControl(),
    hosteltype: new FormControl(),

  });
  newForm = new FormGroup({
    roomno    : new FormControl(),
    totbeds   : new FormControl(),
    roomtype  : new FormControl(),
    hosteltype: new FormControl(),
    hostelid  : new FormControl(),
    blockid   : new FormControl()

  });
  editForm = new FormGroup({
   roomno    : new FormControl(),
   avlbeds   : new FormControl(),
   totbeds   : new FormControl(),
   roomtype  : new FormControl(),
   rcstatus  : new FormControl(),
   hosteltype: new FormControl(),
   hostelid  : new FormControl(),
   blockid   : new FormControl()

  });

  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  @ViewChild('popup3') popup3: Popup;
  @ViewChild('popup4') popup4: Popup;

  add() {

    this.newForm.reset()
        this.newForm.patchValue({
  roomtype  : 'AC',
  hosteltype: 'Boys'
});

    this.popup1.options = {
      header           : "Add New Room",
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
    this.fullview = dt;
    this.editForm.patchValue(dt);

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
    this.toasterService.pop('warning', '', ' You Entered Room No is already Exists in this '+this.hosteltype +' Hostel . please verify');
    console.log('workings');


  }
  addpop() {
    this.toasterService.pop('success', '', " Succesfully Added New Room !");
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
  editRoom(value) {
    console.log(value, 'value');


    // this._apiService.addBooking(value).subscribe(add => {
    //   this._apiService.getboolkingslist().subscribe(bookings => {
    //     this.bookingslist = bookings.data;
    //     this.popup1.hide();
    //     this.addpop();
    //   })

    // });
  }
  addRoom(value) {

    this._apiService.addRoomConfig(value).subscribe(add => {
      if (add.data != 'already exists') {
        this._apiService.getRoomType().subscribe(list => {
          console.log(list);
          this.typelist = list.data;

           const val = { rtype: this.roomtype, htype: this.hosteltype }

          this._apiService.getRoomsList(val).subscribe(lists => {
            console.log(lists);
            this.roomsdata = lists.data;
            this.popup1.hide();
            this.addpop();
          });
        });
      } else {
        this.popToast();
      }

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
