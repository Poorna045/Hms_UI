import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { ApiService } from "../services/api.service";
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { Router, ActivatedRoute } from "@angular/router";
import { Popup } from "ng2-opd-popup";
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-assainroomstest',
  templateUrl: './assainroomstest.component.html',
  styleUrls: ['./assainroomstest.component.css']
})
export class AssainroomstestComponent implements OnInit {

  enablebuttons = false;
  roomslists = [];
  bedlists = [];
  hsttypes: any;
  enableform = false;
  submitreg_no: any;
  roomval: any;
  bedval: any;
  invaliduser = false;
  shownodetails = false;
  shownoroom = false;
  nobed = false;
  showEditForm = false;

  userdetails = {
    rid: '',
    studentname: '',
    reg_no: '',
    dob: '',
    distance: '',
    college: '',
    genderT: '',
    branch: '',
    year: '',
    pwd: '',
    fathername: '',
    parentmobile: '',
    parentemail: '',
    mothername: '',
    parentaddress: '',
    guardianname: '',
    guardianrelation: '',
    guardianmobile: '',
    guardianemail: '',
    guardianaddress: '',
    roomno: '',
    bedno: '',
    type: '',
    blockid: '',
    hostelid: ''
  };

  reg_Form = new FormGroup({
    studentname: new FormControl(),
    dateofbirth: new FormControl(),
    genderT: new FormControl(),
    pwd: new FormControl(),
    distance: new FormControl(),
    roomtype: new FormControl(),
    // priority                : new FormControl(),
    fathername: new FormControl(),
    occupation: new FormControl(),
    parentmobile: new FormControl(),
    parentemail: new FormControl(),
    parentaddress: new FormControl(),
    // permanentaddress        : new FormControl(),
    guardianname: new FormControl(),
    guardianrelation: new FormControl(),
    guardianmobile: new FormControl(),
    guardianemail: new FormControl(),
    guardianaddress: new FormControl(),
    // guardianpermanentaddress: new FormControl()
  });


  showtype = false;

  bedlist = [];
  hsttype: any;
  roomslist = [];
  roomno: any;
  searchval = 'reg_no';
  roombox = false;
  searchbox = false;
  showdetails = false;

  hosteltype = 'Boys';
  roomtype = '';
  roomsdata = [];
  typerooms = '';
  typeroom = 'all';
  fullview = new Object();
  reglist = [];
  typelist = [];

  bid: any;
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "";
  public sortOrder = "asc";
  bookingslist = [];



  topForm1 = new FormGroup({
    search: new FormControl(),
    hosteltype: new FormControl()

  });
  topForm = new FormGroup({
    reg_no: new FormControl(),
    roomno: new FormControl(),
    bedno: new FormControl()

  });
  newForm = new FormGroup({
    roomno: new FormControl(),
    hosteltype: new FormControl(),
    bedno: new FormControl(),
    reg_no: new FormControl(),
    roomtype: new FormControl()

  });
  editForm = new FormGroup({
    roomno: new FormControl(),
    avlbeds: new FormControl(),
    totbeds: new FormControl(),
    roomtype: new FormControl(),
    rcstatus: new FormControl(),
    hosteltype: new FormControl(),
    hostelid: new FormControl(),
    blockid: new FormControl()

  });

  public toasterconfig: ToasterConfig =
  new ToasterConfig({

    showCloseButton: true,
    tapToDismiss: true,
    timeout: 5000

  });
  public toasterService: ToasterService;
  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    private fb: FormBuilder,
    private popup: Popup,
    toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  private myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd'
  };

  ngOnInit() {

    this._apiService.page = 'assainroomstest';

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

  searchwith($event) {
    this.searchval = $event.target.value;
    console.log($event.target.value);

    if ($event.target.value == 'roomno') {
      this.searchbox = false;
      this.roombox = true;
    } else {
      this.roombox = false;
      this.searchbox = true;
    }
  }

  getRooms() {
    this.roomslist = [];

    if (this.userdetails.genderT == 'M') {
      this.hsttypes = 'Boys';
    }
    else {
      this.hsttypes = 'Girls';
    }

    const value = {
      hosteltype: this.hsttypes
    }
    this._apiService.getAVLRoomsList(value).subscribe(rblist => {
      console.log(rblist);
      this.roomslists = rblist.data;

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

  enableType($event) {
    if ($event.target.value == 'roomno') {
      this.showtype = true;
    } else {
      this.showtype = false;
    }
  }

  submit(value) {
    console.log(value, this.searchval);
    this.nobed = false;
    if (this.searchval == 'roomno') {
      this.roomval = value.roomno;

      this.bedval = value.bedno;

      value['type'] = this.hsttype;
      this._apiService.getuserdetailsbybedno(value).subscribe(userl => {

        console.log(userl.data);

        if (userl.data != null) {
          this.getRooms();

          this.userdetails = userl.data;
          this.invaliduser = false;
          this.shownoroom = false;
          this.enableform = false;
          this.shownodetails = false;
          this.showdetails = true;
          this.enablebuttons = true;
        } else {
          this.invaliduser = true;
          this.shownoroom = false;
          this.enableform = false;
          this.shownodetails = false;
          this.showdetails = false;
          this.enablebuttons = false;
        }
        const value = {
          hosteltype: this.hsttype
        }

        this._apiService.getTOTRoomsList(value).subscribe(rblist => {
          console.log(rblist);
          this.roomslist = rblist.data;

        });
      });
    } else {
      this.submitreg_no = value.reg_no;
      this._apiService.getuserdetailsbyid(value).subscribe(lis => {
        console.log(lis);
        if (lis.data != null) {
          this.getRooms();
          if (lis.data.studentname == null) {
            this.shownodetails = true;
            this.shownoroom = false;
            this.invaliduser = false;
            this.showdetails = false;
            this.enableform = false;
          } else if (lis.data.bedno == null) {

            this.nobed = true;
            this.shownoroom = true;
            this.shownodetails = false;
            this.invaliduser = false;
            this.showdetails = true;
            this.enableform = false;
            this.userdetails = lis.data;
          } else {
            this.userdetails = lis.data;
            this.shownodetails = false;
            this.invaliduser = false;
            this.shownoroom = false;
            this.showdetails = true;
            this.enableform = false;
          }
          this.enablebuttons = true;
        } else {
          this.invaliduser = true;
          this.shownoroom = false;
          this.shownodetails = false;
          this.showdetails = false;
          this.enableform = false;
          this.enablebuttons = false;
        }


        console.log(this.userdetails, lis.data);

      });
    }


    // this.roomtype    = value.roomtype;
    // this.hosteltype  = value.hosteltype;
    // this._apiService.getRoomType().subscribe(list => {
    //   console.log(list);
    //   this.typelist = list.data;

    //   const val = { rtype: value.roomtype, htype: value.hosteltype }

    //   this._apiService.getRoomsList(val).subscribe(lists => {
    //     console.log(lists);
    //     this.roomsdata = lists.data;
    //   });
    // });

  }

  submitA(value) {
    console.log(value);
    this.enablebuttons = false;
    this.searchval = value.search;
    this.showdetails = false;
    if (value.search == 'roomno') {
      this.searchbox = false;
      this.roombox = true;
      this.hsttype = value.hosteltype;

      this._apiService.getTOTRoomsList(value).subscribe(rblist => {
        console.log(rblist);
        this.roomslist = rblist.data;

      });
    } else {
      this.roombox = false;
      this.searchbox = true;

    }

  }
  back() {
    this.enablebuttons = true;
    this.showdetails = true;
    this.enableform = false;
    this.showEditForm = false;
    if (this.nobed == true) {
      this.shownoroom = true;
      this.shownodetails = false;
      this.invaliduser = false;
    } else {
      this.shownoroom = false;
      this.shownodetails = false;
      this.invaliduser = false;
    }
  }
  click() {
    this.showdetails = true;
    this.enableform = true;
    this.shownoroom = true;
    this.enablebuttons = false;

if(this.userdetails.genderT=='M'){
  this.newForm.patchValue({
    roomno: '',
    hosteltype: 'Boys',
    bedno: '',
    reg_no: '',
    roomtype: ''
  });
 
}else if(this.userdetails.genderT=='F'){
  this.newForm.patchValue({
    roomno: '',
    hosteltype: 'Girls',
    bedno: '',
    reg_no: '',
    roomtype: ''
  });
}

  }

  getbeds($event) {
    console.log($event.target.value);
    this.roomno = $event.target.value;

    const val = {
      hosteltype: this.hsttype,
      roomno: this.roomno
    }

    this._apiService.getbedslistbyroomno(val).subscribe(blist => {
      console.log(blist);

      let totbeds = blist.data[0].totbeds;
      console.log(totbeds, 'totbeds');

      var beds = [];
      var check = 0;
      let bed = 0;

      for (var c = 1; c <= totbeds; c++) {
        beds.push(c);
      }

      console.log('else test');
      this.bedlist = beds;

    });
  }


  getbedss(event) {
    console.log(event.target.value);
    this.roomno = event.target.value;
    this.bedlist = [];

    const val = {
      hosteltype: this.hsttypes,
      roomno: this.roomno
    }

    this._apiService.getbedslistbyroomno(val).subscribe(blist => {
      console.log(blist);

      let totbeds = blist.data[0].totbeds;
      console.log(totbeds, 'totbeds');

      var beds = [];
      var check = 0;
      let bed = 0;

      for (var c = 1; c <= totbeds; c++) {
        beds.push(c);
      }

      if (blist.data[0].rid) {
        console.log('if test');
        for (var j = 0; j < blist.data.length; j++) {
          for (var i = 0; i < beds.length; i++) {

            if (blist.data[j].bedno == beds[i]) {
              beds.splice(i, 1);
              break;
            }

          }
        }
        this.bedlists = beds;
      }
      else {
        console.log('else test');
        this.bedlists = beds;
      }


      console.log(beds, this.bedlist);


    });
  }

  allocatenew(value) {
    console.log(value);
    this.enablebuttons = true;

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


  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  @ViewChild('popup3') popup3: Popup;
  @ViewChild('popup4') popup4: Popup;



  editDetails() {
    this.showEditForm = true;
    this.reg_Form.patchValue(this.userdetails);
  }

  regisForm() {
    this.showEditForm = true;
    this.reg_Form.reset();
  }

  add() {

    this.newForm.reset()
    this.newForm.patchValue({
      roomtype: 'AC',
      hosteltype: 'Boys'
    });

    this.popup1.options = {
      header: "Add New Room",
      color: "#2c3e50",                      // red, blue.... 
      widthProsentage: 40,                             // The with of the popou measured by browser width 
      animationDuration: 1,                              // in seconds, 0 = no animation 
      showButtons: true,                           // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Add",                          // The text on your confirm button 
      cancleBtnContent: "Cancel",                       // the text on your cancel button 
      confirmBtnClass: "btn btn-default btn-square",   // your class for styling the confirm button 
      cancleBtnClass: "btn btn-danger btn-square",    // you class for styling the cancel button 
      animation: "fadeInDown",                   // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup1.show(this.popup1.options);
  }

  edit(dt) {
    this.fullview = dt;
    this.editForm.patchValue(dt);

    this.popup2.options = {
      header: "Edit Booking",
      color: "#2c3e50",                     // red, blue.... 
      widthProsentage: 40,                            // The with of the popou measured by browser width 
      animationDuration: 1,                             // in seconds, 0 = no animation 
      showButtons: true,                          // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Edit",                        // The text on your confirm button 
      cancleBtnContent: "Cancel",                      // the text on your cancel button 
      confirmBtnClass: "btn btn-info btn-square",     // your class for styling the confirm button 
      cancleBtnClass: "btn btn-danger btn-square",   // you class for styling the cancel button 
      animation: "fadeInDown",                  // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
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
    this.fullview = dt;
    this.popup4.options = {
      header: "Student Info !",
      color: "#2c3e50",                     // red, blue.... 
      widthProsentage: 60,                            // The with of the popou measured by browser width 
      animationDuration: 1,                             // in seconds, 0 = no animation 
      showButtons: false,                         // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Edit",                        // The text on your confirm button 
      cancleBtnContent: "Ok",                          // the text on your cancel button 
      confirmBtnClass: "btn btn-info btn-square",     // your class for styling the confirm button 
      cancleBtnClass: "btn btn-danger btn-square",   // you class for styling the cancel button 
      animation: "fadeInDown",                  // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup4.show(this.popup4.options);
  }
  delete() {
    // this.popup.show();
    this.popup3.options = {
      header: "Delete Booking",
      color: "#2c3e50",                      // red, blue.... 
      widthProsentage: 40,                             // The with of the popou measured by browser width 
      animationDuration: 1,                              // in seconds, 0 = no animation 
      showButtons: true,                           // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Delete",                       // The text on your confirm button 
      cancleBtnContent: "Cancel",                       // the text on your cancel button 
      confirmBtnClass: "btn btn-danger btn-square",    // your class for styling the confirm button 
      cancleBtnClass: "btn btn-warning btn-square",   // you class for styling the cancel button 
      animation: "fadeInDown",                   // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup3.show(this.popup3.options);
  }

  popToast() {
    this.toasterService.pop('warning', '', ' You Entered Room No is already Exists in this ' + this.hosteltype + ' Hostel . please verify');
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
