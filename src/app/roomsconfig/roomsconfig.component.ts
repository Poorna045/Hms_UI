import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { ApiService } from "../services/api.service";
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { Router, ActivatedRoute } from "@angular/router";
import { Popup } from "ng2-opd-popup";
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-roomsconfig',
  templateUrl: './roomsconfig.component.html',
  styleUrls: ['./roomsconfig.component.css']
})
export class RoomsconfigComponent implements OnInit {
  rcid: any;
  filledlist = [];
  roomno: any;
  bedlist = [];
  bedlists = [];
  hosteltype = 'Boys';
  roomtype = 'all';
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
    this.topForm.patchValue({
      roomtype: 'all',
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
    this.roomtype = value.roomtype;
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
    roomtype: new FormControl(),
    hosteltype: new FormControl(),

  });
  newForm = new FormGroup({
    roomno: new FormControl(),
    totbeds: new FormControl(),
    roomtype: new FormControl(),
    hosteltype: new FormControl(),
    hostelid: new FormControl(),
    blockid: new FormControl(),
    roomrent: new FormControl()

  });
  editForm = new FormGroup({
    roomno: new FormControl(),
    avlbeds: new FormControl(),
    totbeds: new FormControl(),
    roomtype: new FormControl(),
    rcstatus: new FormControl(),
    hosteltype: new FormControl(),
    hostelid: new FormControl(),
    blockid: new FormControl(),
    roomrent: new FormControl()

  });

  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  @ViewChild('popup3') popup3: Popup;
  @ViewChild('popup4') popup4: Popup;
  @ViewChild('popup5') popup5: Popup;

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
      confirmBtnClass: "btn btn-info btn-sm btn-square",   // your class for styling the confirm button 
      cancleBtnClass: "btn btn-white btn-sm btn-square",    // you class for styling the cancel button 
      animation: "fadeInDown",                   // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup1.show(this.popup1.options);
  }

  edit(dt) {
    this.fullview = dt;
    this.editForm.patchValue(dt);
    this.rcid = dt.rcid;

    this.popup2.options = {
      header: "Edit Room Config",
      color: "#2c3e50",                     // red, blue.... 
      widthProsentage: 40,                            // The with of the popou measured by browser width 
      animationDuration: 1,                             // in seconds, 0 = no animation 
      showButtons: true,                          // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Edit",                        // The text on your confirm button 
      cancleBtnContent: "Cancel",                      // the text on your cancel button 
      confirmBtnClass: "btn btn-info btn-square btn-sm",     // your class for styling the confirm button 
      cancleBtnClass: "btn btn-white btn-square btn-sm",   // you class for styling the cancel button 
      animation: "fadeInDown",                  // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup2.show(this.popup2.options);
  }

  hide() {
    this.popup1.hide();
    this.popup2.hide();
    this.popup3.hide();
    this.popup4.hide();
    this.popup5.hide();
  }

  view(dt) {
    this.fullview = dt;
    this.popup4.options = {
      header: "Available Rooms Info !",
      color: "#2c3e50",                     // red, blue.... 
      widthProsentage: 40,                            // The with of the popou measured by browser width 
      animationDuration: 1,                             // in seconds, 0 = no animation 
      showButtons: true,                         // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Ok",                        // The text on your confirm button 
      cancleBtnContent: "Close",                          // the text on your cancel button 
      confirmBtnClass: "btn btn-info btn-square btn-sm",     // your class for styling the confirm button 
      cancleBtnClass: "btn btn-white btn-square btn-sm",   // you class for styling the cancel button 
      animation: "fadeInDown",                  // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup4.show(this.popup4.options);
    this.getbedss(dt.roomno);
  }

  filllist(dt) {
    this.fullview = dt;
    this.popup5.options = {
      header: "Filled Rooms Info !",
      color: "#2c3e50",                     // red, blue.... 
      widthProsentage: 40,                            // The with of the popou measured by browser width 
      animationDuration: 1,                             // in seconds, 0 = no animation 
      showButtons: true,                         // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Ok",                        // The text on your confirm button 
      cancleBtnContent: "Close",                          // the text on your cancel button 
      confirmBtnClass: "btn btn-info btn-square btn-sm",     // your class for styling the confirm button 
      cancleBtnClass: "btn btn-white btn-square btn-sm",   // you class for styling the cancel button 
      animation: "fadeInDown",                  // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup5.show(this.popup5.options);
    this.getbedss(dt.roomno);
  }

  delete(dt) {
    // this.popup.show();
    this.rcid = dt.rcid;
    this.popup3.options = {
      header: "Delete Room Config",
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

  popToast() {
    this.toasterService.pop('warning', '', ' You Entered Room No is already Exists in this ' + this.hosteltype + ' Hostel . please verify');
    console.log('workings');


  }
  addpop() {
    this.toasterService.pop('success', '', " Succesfully Added New Room !");
  }
  editpop() {
    this.toasterService.pop('success', '', " Your Changes are Succesful");
  }
  delpop() {
    this.toasterService.pop('success', '', " Succefully Deleted");
  }

  popToast2() {
    this.toasterService.pop('warning', '', 'Please fill all the feilds');

  }


  editRoom(value) {
    value['rcid'] = this.rcid;
    console.log(value, 'value');


    this._apiService.editRoomConfig(value).subscribe(add => {
      this._apiService.getRoomType().subscribe(list => {
        console.log(list);
        this.typelist = list.data;

        const val = { rtype: this.roomtype, htype: this.hosteltype }

        this._apiService.getRoomsList(val).subscribe(lists => {
          console.log(lists);
          this.roomsdata = lists.data;
          this.hide();
          this.editpop();
        });
      });



    });
  }
  addRoom(value) {

    this._apiService.addRoomConfig(value).subscribe(add => {
      if (add.data != 'already exists') {
        this._apiService.getRoomType().subscribe(list => {
          console.log(list);
          this.typelist = list.data;

          const val = { rtype: this.roomtype, htype: this.hosteltype }
          if (val.rtype == '') {
            val.rtype = 'all'
          }
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

  deleteconfig() {

    this._apiService.deleteRoomConfig({ rcid: this.rcid }).subscribe(deletes => {
      this._apiService.getRoomType().subscribe(list => {
        console.log(list);
        this.typelist = list.data;

        const val = { rtype: this.roomtype, htype: this.hosteltype }
        console.log(val, 'init test');
        if (val.rtype == '') {
          val.rtype = 'all'
        }

        this._apiService.getRoomsList(val).subscribe(lists => {
          console.log(lists);
          this.roomsdata = lists.data;
          this.hide();
          this.delpop();
        });
      });

    });
  }



  getbedss(event) {
    // this.goroomtype=roomtyp

    this.roomno = event;
    this.bedlist = [];

    const val = {
      hosteltype: this.hosteltype,
      roomno: this.roomno
    }

    this._apiService.getbedslistbyroomno(val).subscribe(blist => {
      console.log(blist);
      this.filledlist = blist.data;
      let totbeds = blist.data[0].totbeds;
      console.log(totbeds, 'totbeds', blist);

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

}
