import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { ApiService } from "../services/api.service";
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { Router, ActivatedRoute } from "@angular/router";
import { Popup } from "ng2-opd-popup";
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-allot',
  templateUrl: './allot.component.html',
  styleUrls: ['./allot.component.css']
})
export class AllotComponent implements OnInit {
  selectedval='';

  targetval = 0;
  seatsData = [];
  hosteltype = 'Boys';
  regid: any;
  ANonacSeats: any;
  AacSeats: any;
  NonacSeats: any;
  acSeats: any;
  typerooms = '';
  typeroom = 'all';
  fullview = new Object();
  reglist = [];
  typelist = [];
  newname = 'all';
  newnames='';

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
    public _route: ActivatedRoute,
    public _apiService: ApiService,
    public fb: FormBuilder,
    public popup: Popup,
    toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd'
  };

  ngOnInit() {
    this._apiService.page = "allot";
    this._apiService.getRoomType().subscribe(list => {
      console.log(list); this.typelist = list.data;
      let gender = 'Boys';

      const val = {
        type: 'all',
        gender: gender
      }
      this._apiService.getreglist(val).subscribe(lists => {
        console.log(lists, 'reglists');
        this.reglist = lists.data;
        const gs = {
          hosteltype: 'Boys'
        }
        this._apiService.getAvailableSeatsCount(gs).subscribe(seats => {
          console.log(seats, 'seats test');
          this.seatsData = seats.data;
          
          this.newnames = this.typelist[0].type;
          
      
            this.selectedval=this.typelist[0].typeid;
         

          if(seats.data.length>0)
          this.targetval=this.seatsData[0].avlbeds - this.seatsData[0].selected;
          
          console.log(this.targetval,'targetval');
          
        });
      });

    })
  }

  getavlseats($event) {
    const gs = {
      hosteltype: $event.target.value
    }
    this.hosteltype = $event.target.value;
    this._apiService.getAvailableSeatsCount(gs).subscribe(seats => {
      console.log(seats, 'seats test');
      this.seatsData = seats.data;
   

      if(seats.data.length>0)
      this.targetval=this.seatsData[0].avlbeds - this.seatsData[0].selected;

      const val = {
        type: this.typeroom,
        gender: this.hosteltype
      }
      this._apiService.getreglist(val).subscribe(lists => {
        console.log(lists);
        this.reglist = lists.data;

      });

    });
  }
  getTypeof($event) {


    this.typeroom = $event.target.value;

    if (this.typeroom != 'all') {
      var nsa = this.typelist.filter(function (obj) {
        return obj.typeid == $event.target.value;
      });
      this.newname = nsa[0].type;

      var nsas = this.seatsData.filter(function (obj) {
        return obj.typeid == $event.target.value;
      });
      this.targetval=nsas[0].avlbeds - nsas[0].selected;

      this.selectedval=nsas[0].typeid
    } else {
      this.newname = this.typeroom;
    }


   

    console.log($event.target.value, 'newname type testing', this.newname);
    const val = {
      type: $event.target.value,
      gender: this.hosteltype
    }
    this._apiService.getreglist(val).subscribe(list => {
      console.log(list);

      this.reglist = list.data;
    });
  }

  getTypeof2($event) {

    this.typerooms = $event.target.value;

      var nsa = this.typelist.filter(function (obj) {
        return obj.typeid == $event.target.value;
      });

      var nsas = this.seatsData.filter(function (obj) {
        return obj.typeid == $event.target.value;
      });

      this.targetval=nsas[0].avlbeds - nsas[0].selected;
   

      this.selectedval=nsas[0].typeid

    
      console.log($event.target.value,nsa);
      this.newnames = nsa[0].type;
 
  }
  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
  }

  newForm = new FormGroup({
    type: new FormControl(),
  });

  @ViewChild('popup1') popup1: Popup;
  @ViewChild('popup2') popup2: Popup;
  @ViewChild('popup3') popup3: Popup;
  @ViewChild('popup4') popup4: Popup;

  add() {

    this.newForm.reset()

    this.popup1.options = {
      header: "Add New Booking",
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

  accept(dt) {
    this.fullview = dt;

    if (this.typeroom != 'all') {
      this.typerooms = this.typeroom;
    } else {
      this.typerooms = this.typeroom;
      this.selectedval=this.typelist[0].typeid
    }
 
    this.newForm.patchValue({
      type:this.typelist[0].typeid
    })
         
    if(this.seatsData.length>0)
    this.targetval=this.seatsData[0].avlbeds - this.seatsData[0].selected;

    this.popup2.options = {
      header: "Acceptance ",
      color: "#2c3e50",                     // red, blue.... 
      widthProsentage: 40,                            // The with of the popou measured by browser width 
      animationDuration: 1,                             // in seconds, 0 = no animation 
      showButtons: false,                         // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Accept",                        // The text on your confirm button 
      cancleBtnContent: "Cancel",                      // the text on your cancel button 
      confirmBtnClass: "btn btn-info btn-square",     // your class for styling the confirm button 
      cancleBtnClass: "btn btn-danger btn-square",   // you class for styling the cancel button 
      animation: "fadeInDown",                  // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup2.show(this.popup2.options);
  }

  hide() {
    this.popup2.hide();
    this.popup3.hide();
    this.popup4.hide();
  }

  view(dt) {
    this.fullview = dt;
    this.popup4.options = {
      header: "User Info !",
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
  wait(dt) {
    // this.popup.show();
    // this.fullview=dt;
    this.regid = dt.registerid;
    this.popup3.options = {
      header: "Waiting List",
      color: "#2c3e50",                      // red, blue.... 
      widthProsentage: 40,                             // The with of the popou measured by browser width 
      animationDuration: 1,                              // in seconds, 0 = no animation 
      showButtons: true,
      cancleBtnContent: "Cancel",
      cancleBtnClass: "btn btn-white btn-square btn-sm",    // you class for styling the cancel button 
      confirmBtnContent: "Submit",
      confirmBtnClass: "btn btn-warning btn-square btn-sm",   // your class for styling the confirm button                             



      animation: "fadeInDown",                   // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
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
    this.toasterService.pop('success', '', " Successfully Accepted ");
  }
  delpop() {
    this.toasterService.pop('success', '', " Status Successfully Changed to Waiting list");
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

    if (this.typeroom == 'all') {
      this.fullview["type"] = this.selectedval;
    }
    else{
      this.fullview["type"]=this.selectedval;     
    }

    const vals={
      type:this.selectedval,
      registerid:this.fullview['registerid']
    }
    console.log(this.fullview,this.typeroom,this.hosteltype);

    this._apiService.vacantroom(vals).subscribe(add => {
      this._apiService.getRoomType().subscribe(list => {
        console.log(list); this.typelist = list.data;

        const val = {
          type: this.typeroom,
          gender: this.hosteltype
        }
        this._apiService.getreglist(val).subscribe(lists => {
          console.log(list);
          this.reglist = lists.data;
          this.popup2.hide();
          this.editpop();
          const gs = {
            hosteltype: this.hosteltype
          }
          this._apiService.getAvailableSeatsCount(gs).subscribe(seats => {
            console.log(seats, 'seats test');
            this.seatsData = seats.data;
         
               if(seats.data.length>0)
               this.targetval=this.seatsData[0].avlbeds - this.seatsData[0].selected;

          });

        });

      })
    });
  }

  waitinglist() {
    const value = {
      registerid: this.regid
    }
    this._apiService.waitinglist(value).subscribe(deletes => {
      this._apiService.getRoomType().subscribe(list => {
        console.log(list); this.typelist = list.data;


        const val = {
          type: this.typeroom,
          gender: this.hosteltype
        }
        this._apiService.getreglist(val).subscribe(lists => {
          console.log(list);
          this.reglist = lists.data;
          this.popup3.hide();
          this.delpop();
          const gs = {
            hosteltype: this.hosteltype
          }
          this._apiService.getAvailableSeatsCount(gs).subscribe(seats => {
            console.log(seats, 'seats test');
            this.seatsData=seats.data;

            if(seats.data.length>0)
            this.targetval=this.seatsData[0].avlbeds - this.seatsData[0].selected;

          });
        });

      })

    });
  }
}
