import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AppSettings } from '../app.settings';
import { Popup } from 'ng2-opd-popup';
import { FormGroup, FormControl } from '@angular/forms';
import { ToasterContainerComponent, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

@Component({
  selector: 'app-complaintslist',
  templateUrl: './complaintslist.component.html',
  styleUrls: ['./complaintslist.component.css']
})
export class ComplaintslistComponent implements OnInit {
  ctype = 'all';
  complaintsList: any;
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "";
  public sortOrder = "asc";
  bookingslist = [];
  complaintsdata = [];
  data = [];
  // typerooms = '';
  // complainttype = 'all';
  // fullview = new Object();
  // reglist = [];
  typelist = [];

  topForm = new FormGroup({
    complaint_type: new FormControl(),
    // hosteltype: new FormControl(),

  });

  @ViewChild('popup1') popup1: Popup;

  constructor(private _router: Router,
    private _route: ActivatedRoute,
    private _apiService: ApiService,
    private popup: Popup,
    public toasterService: ToasterService) {

  }

  ngOnInit() {
    this._apiService.page = 'complaintslist'

    this.topForm.patchValue({
      complaint_type: this.ctype
    });

    const val = { type: 'all' }
    this._apiService.getComplaintList(val).subscribe(lists => {
      console.log(lists);
      this.data = lists.data;
    });

  }

  complaints_Form = new FormGroup({
    complaint_type: new FormControl(),
    complaint_priority: new FormControl(),
    complaint_category_type: new FormControl(),
    feedback: new FormControl(),
  });

  addpop() {
    this.toasterService.pop('success', '', " You Request was Succesful !");
  }


  public toasterconfig: ToasterConfig =
  new ToasterConfig({

    showCloseButton: true,
    tapToDismiss: true,
    timeout: 5000

  });

  getComplaints($event) {
    console.log($event.target.value, '28');
    const val = {
      type: $event.target.value
    }
    this.ctype = $event.target.value;
    this._apiService.getComplaintList(val).subscribe(lists => {
      console.log(lists);
      this.data = lists.data;
      console.log(this.complaintsdata);
      console.log(lists);

    });
  }


  add() {
    this.complaints_Form.reset();
    this.popup1.options = {
      header: "Raise Complaint / Issue ",
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

  addComplaints(value) {
    value.reg_no = localStorage.getItem('reg_no');
    console.log(value, 'value');
    this._apiService.addComplaints(value).subscribe(update => {
      const val = {
        type: this.ctype
      }

      this._apiService.getComplaintList(val).subscribe(lists => {
        console.log(lists);
        this.data = lists.data;
        this.complaints_Form.reset();
        this.popup1.hide();
        this.addpop();
      });
    });
  }
}
