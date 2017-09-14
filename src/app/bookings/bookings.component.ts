import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { ApiService } from "../services/api.service";
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { Router, ActivatedRoute } from "@angular/router";
import { Popup } from "ng2-opd-popup";
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  hid: any;
  roomslist = [];
  roomsdata = [];
  hostelsdata = [];
  selctval = 'hostel';

  utc = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
  fullview = new Object();
  changetype = '';
  rid = '';
  valss: number;
  seemes = false
  regList = [];
  bid = '';
  cvalue = 'M';
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "";
  public sortOrder = "asc";
  bookingslist = [];

  public toasterconfig: ToasterConfig =
  new ToasterConfig({

    showCloseButton: true,
    tapToDismiss: true,
    timeout: 7000

  });
  public toasterService: ToasterService;
  constructor(private _router: Router,
    private _route: ActivatedRoute,
    public _apiService: ApiService,
    private fb: FormBuilder,
    private popup: Popup,
    toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd'
  };


  getHostels() {


    this._apiService.gethostelconfig().subscribe(listss => {
      console.log(listss);
      this.hostelsdata = listss.data;


      this.emptyForm.patchValue({

        hostel: this.hostelsdata[0].hid,


      });

      if (this.selctval == 'room') {
        this.getRoomslist(this.hostelsdata[0].hid);
      }
    });


  }

  getRoomslist(hid) {

    this.hid = hid;
    const val = {
      hid: hid
    }
    this._apiService.getroomslistByhid(val).subscribe(ddata => {
      console.log(ddata, 'ddata');
      this.roomslist = ddata.data;
      this.emptyForm.patchValue({

        room: this.roomslist[0].rcid,


      });
    })

  }

  ngOnInit() {
    this._apiService.page = "bookings";
    this._apiService.getboolkingslist().subscribe(bookings => {
      console.log(bookings, 'mess test');

      this.bookingslist = bookings.data;
      this._apiService.getregisteredUsers().subscribe(dat => {
        this.regList = dat.data;
        this.getHostels();
      })
    })
    console.log(new Date().getMonth(), 'month testing');

  }
  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
  }

  newForm = new FormGroup({
    startdate: new FormControl(),
    enddate: new FormControl(),
    description: new FormControl(),
    semstartdate: new FormControl(),
    semenddate: new FormControl(),
    hosteltype: new FormControl()

  });
  editForm = new FormGroup({
    startdate: new FormControl(),
    enddate: new FormControl(),
    description: new FormControl(),
    semstartdate: new FormControl(),
    semenddate: new FormControl(),
    hosteltype: new FormControl()

  });
  emptyForm = new FormGroup({
    hosteltype: new FormControl(),
    empty: new FormControl(),
    hostel: new FormControl(),
    room: new FormControl()

  });

  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  @ViewChild('popup3') popup3: Popup;
  @ViewChild('popup4') popup4: Popup;
  @ViewChild('popup5') popup5: Popup;
  @ViewChild('popup6') popup6: Popup;
  @ViewChild('popup7') popup7: Popup;

  add() {

    this.newForm.reset()
    this.newForm.patchValue({ hosteltype: 'Boys' });

    this.popup1.options = {
      header: "Add New Booking",
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

    this.editForm.patchValue({ startdate: { formatted: dt.startdate } });
    this.editForm.patchValue({ enddate: { formatted: dt.enddate } });
    this.editForm.patchValue({ semstartdate: { formatted: dt.semstartdate } });
    this.editForm.patchValue({ semenddate: { formatted: dt.semenddate } });
    this.editForm.patchValue({ description: dt.description });
    this.editForm.patchValue({ hosteltype: dt.hosteltype });

    this.bid = dt.bid;

    this.popup2.options = {
      header: "Edit Booking Details",
      color: "#2c3e50",                     // red, blue.... 
      widthProsentage: 40,                            // The with of the popou measured by browser width 
      animationDuration: 1,                             // in seconds, 0 = no animation 
      showButtons: true,                          // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Edit",                        // The text on your confirm button 
      cancleBtnContent: "Cancel",                      // the text on your cancel button 
      confirmBtnClass: "btn btn-info btn-sm btn-square",     // your class for styling the confirm button 
      cancleBtnClass: "btn btn-white btn-sm btn-square",   // you class for styling the cancel button 
      animation: "fadeInDown",                  // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup2.show(this.popup2.options);
  }
  delete(dt) {
    // this.popup.show();
    this.bid = dt.bid;
    this.popup3.options = {
      header: "Delete Booking",
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

  delete2(dt) {
    // this.popup.show();
    this.rid = dt.registerid;
    this.popup4.options = {
      header: "Delete",
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

    this.popup4.show(this.popup4.options);
  }

  deleteall() {

    this.popup5.options = {
      header: "Delete",
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

    this.popup5.show(this.popup5.options);
  }


  changedate(dt, type) {
    // this.popup.show();
    this.fullview = dt;
    this.bid = dt.bid;
    this.changetype = type;
    if (type == 'postpone') {
      var head = 'Postpone Booking End Date';
    } else {
      var head = 'Prepone Booking End Date';
    }
    this.popup6.options = {
      header: head,
      color: "#2c3e50",                     // red, blue.... 
      widthProsentage: 40,                            // The with of the popou measured by browser width 
      animationDuration: 1,                             // in seconds, 0 = no animation 
      showButtons: false,                          // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Change",                        // The text on your confirm button 
      cancleBtnContent: "Cancel",                      // the text on your cancel button 
      confirmBtnClass: "btn btn-info btn-sm btn-square",     // your class for styling the confirm button 
      cancleBtnClass: "btn btn-white btn-sm btn-square",   // you class for styling the cancel button 
      animation: "fadeInDown",                  // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup6.show(this.popup6.options);
  }


  empTy(dt) {
    // this.popup.show();
    this.fullview = dt;

    this.popup7.options = {
      header: 'Empty The Rooms',
      color: "#2c3e50",                     // red, blue.... 
      widthProsentage: 40,                            // The with of the popou measured by browser width 
      animationDuration: 1,                             // in seconds, 0 = no animation 
      showButtons: true,                          // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Empty",                        // The text on your confirm button 
      cancleBtnContent: "Cancel",                      // the text on your cancel button 
      confirmBtnClass: "btn btn-danger btn-sm btn-square",     // your class for styling the confirm button 
      cancleBtnClass: "btn btn-white btn-sm btn-square",   // you class for styling the cancel button 
      animation: "fadeInDown",                  // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup7.show(this.popup7.options);
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
    this.toasterService.pop('success', '', " Your Changes are Succesful");
  }

  existspop() {

    this.toasterService.pop('warning', '', "Please Confirm that Respective Person has Vacated his Room");
  }


  existspop2() {

    this.toasterService.pop('warning', '', "Please Confirm that All Persons had Vacated their Room");
  }


  popToast2() {
    this.toasterService.pop('warning', '', 'Please fill all the feilds');
  }

  errorPopup(hosteltype) {
    
        this.toasterService.pop('warning', '', "Soory Unable To Process ! Bookings For " + hosteltype + " hosteltype is Already Opened ! Please Verify " );
      }
    

  addBooking(value) {
    console.log(value, 'value');
    console.log(value.startdate);

    var valid = false;

    var res = this.bookingslist.filter(function (obj) {
      return obj.status == 'enable' && (obj.hosteltype==value.hosteltype); 
    });


    if (res.length<=0) {

      this._apiService.addBooking(value).subscribe(add => {
        this._apiService.getboolkingslist().subscribe(bookings => {
          this.bookingslist = bookings.data;
          this.popup1.hide();
          this.addpop();
        })

      });

    }else {
      this.errorPopup(value.hosteltype);
    }

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

  deleteusers() {
    const value = {
      rid: this.rid
    }
    this._apiService.deleteuser(value).subscribe(deletes => {

      if (deletes.data == 'ok') {

        this._apiService.getregisteredUsers().subscribe(dat => {
          this.regList = dat.data;
          this.popup4.hide();
          this.delpop();
        })
      } else if (deletes.data != 'ok') {
        this.existspop();
      }
    });
  }

  deleteALlusers() {
    const val = {
      type: this.cvalue
    }

    this._apiService.deleteAllUsers(val).subscribe(deletes => {

      if (deletes.data == 'ok') {

        this._apiService.getregisteredUsers().subscribe(dat => {
          this.regList = dat.data;
          this.popup4.hide();
          this.delpop();
        })
      } else if (deletes.data != 'ok') {
        this.existspop2();
      }

    });
  }

  changeDateValue() {

    const value = {
      value: this.valss,
      bid: this.bid,
      type: this.changetype
    }
    this._apiService.changeDateValue(value).subscribe(deletes => {

      this._apiService.getboolkingslist().subscribe(bookings => {
        this.bookingslist = bookings.data;
        this.popup6.hide();
        this.valss = 0;
        this.delpop();
      })

    });
  }

  hide() {
    this.popup1.hide();
    this.popup2.hide();
    this.popup3.hide();
    this.popup4.hide();
    this.popup5.hide();
    this.popup6.hide();
  }

  gocheck($event) {
    console.log($event.target.value);

    console.log(this.utc, 'utcdate');

    if (this.changetype == 'postpone') {

      var addDays = new Date(this.fullview['enddate']);
      addDays.setDate(addDays.getDate() + parseInt($event.target.value));

      var aDay = new Date(addDays).toJSON().slice(0, 10).replace(/-/g, '-');

      if (this.utc >= aDay) {
        this.seemes = true;
      } else {
        this.seemes = false;
      }

    } else {

      var subDays = new Date(this.fullview['enddate']);
      subDays.setDate(subDays.getDate() - parseInt($event.target.value));

      var sDay = new Date(subDays).toJSON().slice(0, 10).replace(/-/g, '-');

      if (this.utc > sDay) {
        this.seemes = true;
      } else {
        this.seemes = false;
      }
    }
    console.log(this.utc, 'test', aDay, sDay, this.utc < aDay, this.utc < sDay);


  }

  changeVal(value) {
    this.selctval = value;
    console.log(this.selctval, 'selected value');

    if (this.selctval == 'hostel' || this.selctval == 'room') {
      this.getHostels();
    }
    else {
      this.emptyForm.patchValue({
        hosteltype: 'Boys'
      });
    }

  }
  // emptyTheRooms(emptyForm.value)
  emptyTheRooms() {
    this.fullview['empty'] = this.selctval;
    if (this.selctval == 'hostel') {
      this.fullview['hosteltype'] = '';
      this.fullview['room'] = '';
    } else if (this.selctval == 'room') {
      this.fullview['hosteltype'] = '';
    }
    else if (this.selctval == 'hosteltype') {
      this.fullview['hostel'] = '';
      this.fullview['room'] = '';
    }
    this.popup7.hide();
    console.log(this.fullview);
    this._apiService.emptyTheRooms(this.fullview).subscribe(update => {


    })
  }


}
