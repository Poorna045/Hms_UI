import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AppSettings } from '../app.settings';
import { Popup } from 'ng2-opd-popup';
import { FormGroup, FormControl } from '@angular/forms';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  utype: any;
  instruction_detail  =[];
  notification_detail  = [];
  event_detail  =[];


  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    private popup: Popup,
    public toasterService: ToasterService) { }

  private myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd'
  };
  ngOnInit() {
    this._apiService.page = 'instructions'
    this.utype = localStorage.getItem('utype');
    this.getNotification();
    this.getInstruction();
    this.getEvent();
  }

  hide() {
    this.popup1.hide();
  }

  addNotification(value) {
    value['notificationdate']=value.notificationdate.formatted;
    // const value = {
    //   notificationdate: this.noticeForm.controls['notificationdate'].value.formatted,
    //   noticedescription: this.noticeForm.controls['noticedescription'].value,
    // }
    console.log(value.notificationdate, 'value1');
    this._apiService.addNotification(value).subscribe(data => {
      if (data.success) {
        this.noticeForm.reset();
        this.getNotification();
        this.popup1.hide();
        this.addpop();
      }
    });
  }

  getNotification() {
    this._apiService.getNotifications().subscribe(data => {
      console.log(data, 'test1');
      this.notification_detail = data.data;
    });
  }

  public toasterconfig: ToasterConfig =
  new ToasterConfig({

    showCloseButton: true,
    tapToDismiss: true,
    timeout: 5000

  });


  addpop() {
    this.toasterService.pop('success', '', " You Request was Succesful !");
  }

  addInstructions() {
    const value = {
      instructiondate: this.instructionsForm.controls['instructiondate'].value.formatted,
      instructiondescription: this.instructionsForm.controls['instructiondescription'].value,
    }
    console.log(value.instructiondate, 'value1');
    this._apiService.addInstructions(value).subscribe(data => {
      if (data.success) {
        this.instructionsForm.reset();
        this.getInstruction();
        this.popup1.hide();
        this.addpop();
      }
    });
  }


  getInstruction() {
    this._apiService.getInstructions().subscribe(data => {
      console.log(data, 'test2');
      this.instruction_detail = data.data;
    });
  }

  addEvents() {
    const value = {
      eventtype: this.eventForm.controls['eventtype'].value,
      eventdate: this.eventForm.controls['eventdate'].value.formatted,
      eventdescription: this.eventForm.controls['eventdescription'].value,
      eventtime: this.eventForm.controls['eventtime'].value,
    }
    console.log(value.eventdate, 'value1');
    this._apiService.addEvents(value).subscribe(data => {
      if (data.success) {
        this.eventForm.reset();
        this.getEvent();
        this.popup1.hide();
        this.addpop();
      }
    });
  }

  getEvent() {
    this._apiService.getEvents().subscribe(data => {
      console.log(data, 'test3');
      this.event_detail = data.data;
    });
  }
  noticeForm = new FormGroup({
    notificationdate: new FormControl(),
    noticedescription: new FormControl()
  });

  instructionsForm = new FormGroup({
    instructiondate: new FormControl(),
    instructiondescription: new FormControl()
  });

  eventForm = new FormGroup({
    eventtype: new FormControl(),
    eventdate: new FormControl(),
    eventdescription: new FormControl(),
    eventtime: new FormControl()
  });
  @ViewChild('popup1') popup1: Popup;
  // @ViewChild('popup2') popup2: Popup;
  // @ViewChild('popup3') popup3: Popup;

  add() {
    this.noticeForm.reset()
    this.popup1.options = {
      header: "Add New Notice",
      color: "#2c3e50",                      // red, blue.... 
      widthProsentage: 40,                             // The with of the popou measured by browser width 
      animationDuration: 1,                              // in seconds, 0 = no animation 
      showButtons: false,                           // You can hide this in case you want to use custom buttons 
      confirmBtnContent: "Add",                          // The text on your confirm button 
      cancleBtnContent: "Cancel",                       // the text on your cancel button 
      confirmBtnClass: "btn btn-default btn-square",   // your class for styling the confirm button 
      cancleBtnClass: "btn btn-danger btn-square",    // you class for styling the cancel button 
      animation: "fadeInDown",                   // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };

    this.popup1.show(this.popup1.options);
  }


  public timings = [
    // { title: '0:00 AM', value: '0:00 AM' },
    // { title: '0:15 AM', value: '0:15 AM' },
    // { title: '0:30 AM', value: '0:30 AM' },
    // { title: '0:45 AM', value: '0:45 AM' },
    // { title: '1:00 AM', value: '1:00 AM' },
    // { title: '1:15 AM', value: '1:15 AM' },
    // { title: '1:30 AM', value: '1:30 AM' },
    // { title: '1:45 AM', value: '1:45 AM' },
    // { title: '2:00 AM', value: '2:00 AM' },
    // { title: '2:15 AM', value: '2:15 AM' },
    // { title: '2:30 AM', value: '2:30 AM' },
    // { title: '2:45 AM', value: '2:45 AM' },
    // { title: '3:00 AM', value: '3:00 AM' },
    // { title: '3:15 AM', value: '3:15 AM' },
    // { title: '3:30 AM', value: '3:30 AM' },
    // { title: '3:45 AM', value: '3:45 AM' },
    // { title: '4:00 AM', value: '4:00 AM' },
    // { title: '4:15 AM', value: '4:15 AM' },
    // { title: '4:30 AM', value: '4:30 AM' },
    // { title: '4:45 AM', value: '4:45 AM' },
    // { title: '5:00 AM', value: '5:00 AM' },
    // { title: '5:15 AM', value: '5:15 AM' },
    // { title: '5:30 AM', value: '5:30 AM' },
    // { title: '5:45 AM', value: '5:45 AM' },
    { title: '6:00 AM', value: '6:00 AM' },
    { title: '6:15 AM', value: '6:15 AM' },
    { title: '6:30 AM', value: '6:30 AM' },
    { title: '6:45 AM', value: '6:45 AM' },
    { title: '7:00 AM', value: '7:00 AM' },
    { title: '7:15 AM', value: '7:15 AM' },
    { title: '7:30 AM', value: '7:30 AM' },
    { title: '7:45 AM', value: '7:45 AM' },
    { title: '8:00 AM', value: '8:00 AM' },
    { title: '8:15 AM', value: '8:15 AM' },
    { title: '8:30 AM', value: '8:30 AM' },
    { title: '8:45 AM', value: '8:45 AM' },
    { title: '9:00 AM', value: '9:00 AM' },
    { title: '9:15 AM', value: '9:15 AM' },
    { title: '9:30 AM', value: '9:30 AM' },
    { title: '9:45 AM', value: '9:45 AM' },
    { title: '10:00 AM', value: '10:00 AM' },
    { title: '10:15 AM', value: '10:15 AM' },
    { title: '10:30 AM ', value: '10:30 AM' },
    { title: '10:45 AM', value: '10:45 AM' },
    { title: '11:00 AM', value: '11:00 AM' },
    { title: '11:15 AM', value: '11:15 AM' },
    { title: '11:30 AM', value: '11:30 AM' },
    { title: '11:45 AM', value: '11:45 AM' },
    { title: '12:00 PM', value: '12:00 PM' },
    { title: '12:15 PM', value: '12:15 PM' },
    { title: '12:30 PM', value: '12:30 PM' },
    { title: '12:45 PM', value: '12:45 PM' },
    { title: '1:00 PM', value: '1:00 PM' },
    { title: '1:15 PM', value: '1:15 PM' },
    { title: '1:30 PM', value: '1:30 PM' },
    { title: '1:45 PM', value: '1:45 PM' },
    { title: '2:00 PM', value: '2:00 PM' },
    { title: '2:15 PM', value: '2:15 PM' },
    { title: '2:30 PM', value: '2:30 PM' },
    { title: '2:45 PM', value: '2:45 PM' },
    { title: '3:00 PM', value: '3:00 PM' },
    { title: '3:15 PM', value: '3:15 PM' },
    { title: '3:30 PM', value: '3:30 PM' },
    { title: '3:45 PM', value: '3:45 PM' },
    { title: '4:00 PM', value: '4:00 PM' },
    { title: '4:15 PM', value: '4:15 PM' },
    { title: '4:30 PM', value: '4:30 PM' },
    { title: '4:45 PM', value: '4:45 PM' },
    { title: '5:00 PM', value: '5:00 PM' },
    { title: '5:15 PM', value: '5:15 PM' },
    { title: '5:30 PM', value: '5:30 PM' },
    { title: '5:45 PM', value: '5:45 PM' },
    { title: '6:00 PM', value: '6:00 PM' },
    { title: '1:00 PM', value: '1:00 PM' },
    { title: '1:15 PM', value: '1:15 PM' },
    { title: '1:30 PM', value: '1:30 PM' },
    { title: '1:45 PM', value: '1:45 PM' },
    { title: '2:00 PM', value: '2:00 PM' },
    { title: '2:15 PM', value: '2:15 PM' },
    { title: '2:30 PM', value: '2:30 PM' },
    { title: '2:45 PM', value: '2:45 PM' },
    { title: '3:00 PM', value: '3:00 PM' },
    { title: '3:15 PM', value: '3:15 PM' },
    { title: '3:30 PM', value: '3:30 PM' },
    { title: '3:45 PM', value: '3:45 PM' },
    { title: '4:00 PM', value: '4:00 PM' },
    { title: '4:15 PM', value: '4:15 PM' },
    { title: '4:30 PM', value: '4:30 PM' },
    { title: '4:45 PM', value: '4:45 PM' },
    { title: '5:00 PM', value: '5:00 PM' },
    { title: '5:15 PM', value: '5:15 PM' },
    { title: '5:30 PM', value: '5:30 PM' },
    { title: '5:45 PM', value: '5:45 PM' },
    { title: '6:00 PM', value: '6:00 PM' },
    { title: '6:15 PM', value: '6:15 PM' },
    { title: '6:30 PM', value: '6:30 PM' },
    { title: '6:45 PM', value: '6:45 PM' },
    { title: '7:00 PM', value: '7:00 PM' },
    { title: '7:15 PM', value: '7:15 PM' },
    { title: '7:30 PM', value: '7:30 PM' },
    { title: '7:45 PM', value: '7:45 PM' },
    { title: '8:00 PM', value: '8:00 PM' },
    { title: '8:15 PM', value: '8:15 PM' },
    { title: '8:30 PM', value: '8:30 PM' },
    { title: '8:45 PM', value: '8:45 PM' },
    { title: '9:00 PM', value: '9:00 PM' },
    // { title: '9:15 PM', value: '9:15 PM' },
    // { title: '9:30 PM', value: '9:30 PM' },
    // { title: '9:45 PM', value: '9:45 PM' },
    // { title: '10:00 PM', value: '10:00 PM' },
    // { title: '10:15 PM', value: '10:15 PM' },
    // { title: '10:30 PM ', value: '10:30 PM' },
    // { title: '10:45 PM', value: '10:45 PM' },
    // { title: '11:00 PM', value: '11:00 PM' },
    // { title: '11:15 PM', value: '11:15 PM' },
    // { title: '11:30 PM', value: '11:30 PM' },
    // { title: '11:45 PM', value: '11:45 PM' },

  ]
}
