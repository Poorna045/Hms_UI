import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { AppSettings } from '../app.settings';

@Injectable()
export class ApiService {



  page = "dashboard";

  constructor(private _http: Http) { }

  // getting designations data
  getdesignations() {
    const body = {}
    return this.callApi(AppSettings.USER_DESIGNATIONS_VIEW_API, 'get', body);
  }

  // year update
  updateYears(data) {
    return this.callApi(AppSettings.UPDATE_YEAR_API, 'post', data);
  }

  // add new booking 
  addBooking(data) {
    return this.callApi(AppSettings.ADD_BOOKING_API, 'post', data);
  }

  // add new booking 
  editBooking(data) {
    return this.callApi(AppSettings.EDIT_BOOKING_API, 'post', data);
  }

  // add new booking 
  deleteBooking(data) {
    return this.callApi(AppSettings.DELETE_BOOKING_API, 'post', data);
  }

  // add new booking 
  feeconfig(data) {
    return this.callApi(AppSettings.FEE_CONFIG_API, 'post', data);
  }

  // add room type 
  addRoomType(data) {
    return this.callApi(AppSettings.ADD_TYPE_API, 'post', data);
  }

  // edit room type 
  editRoomType(data) {
    return this.callApi(AppSettings.EDIT_TYPE_API, 'post', data);
  }

  // edit room type 
  deleteRoomType(data) {
    return this.callApi(AppSettings.DELETE_TYPE_API, 'post', data);
  }

  getboolkingslist() {
    const body = {}
    return this.callApi(AppSettings.GETBOOKLIST_API, 'get', body);
  }

  getreglist(body) {

    return this.callApi(AppSettings.REGLIST_API, 'post', body);
  }
  // accept the allocation 
  vacantroom(body) {

    return this.callApi(AppSettings.VACANT_API, 'post', body);
  }

  // waiting list
  waitinglist(body) {

    return this.callApi(AppSettings.WAITING_API, 'post', body);
  }

  // add new room
  addRoomConfig(body) {

    return this.callApi(AppSettings.ADD_ROOM_API, 'post', body);
  }

  getRoomType() {
    const body = {}
    return this.callApi(AppSettings.ROOMTYPE_API, 'get', body);
  }

  getRoomsList(body) {

    return this.callApi(AppSettings.GET_ROOMS_API, 'post', body);
  }

  // get rooms beds list
  getAVLRoomsList(body) {

    return this.callApi(AppSettings.GET_ROOMS_AVLB_API, 'post', body);
  }

  // // get user details list
  //   getAVLRoomsList(body) {

  //   return this.callApi(AppSettings.GET_ROOMS_AVLB_API, 'post', body);
  // }


  // get beds list by room no
  getbedslistbyroomno(body) {

    return this.callApi(AppSettings.GET_BEDS_BY_ROOMNO_API, 'post', body);
  }

  // get student details to add
  getstudentDetailstoADD(body) {

    return this.callApi(AppSettings.GET_DETAILS_TO_ADD_API, 'post', body);
  }

  // get student details by id
  getuserdetailsbyid(body) {

    return this.callApi(AppSettings.GET_DETAILS_BY_ID_API, 'post', body);
  }

  // get student details by id
  getuserdetailsbybedno(body) {

    return this.callApi(AppSettings.GET_DETAILS_BY_ROOMNO_API, 'post', body);
  }

  // get total rooms details
  getTOTRoomsList(body) {

    return this.callApi(AppSettings.GET_TOT_ROOMS_API, 'post', body);
  }

  // edit student details
  editStudDetails(body) {

    return this.callApi(AppSettings.EDIT_STUD_DETAILS_API, 'post', body);
  }

  // allocate room to student
  allocateRoom(body) {

    return this.callApi(AppSettings.ALLOCATE_ROOM_STUD_API, 'post', body);
  }


  // free the room 
  freetheroom(body) {

    return this.callApi(AppSettings.FREE_THE_ROOM_API, 'post', body);
  }

  // get Available Seats count  
  getAvailableSeatsCount(body) {

    return this.callApi(AppSettings.AVL_SEATS_COUNT_API, 'post', body);
  }

  // edit the room  config 
  editRoomConfig(body) {

    return this.callApi(AppSettings.EDIT_ROOM_CONFIG_API, 'post', body);
  }

  // free the room  config
  deleteRoomConfig(body) {

    return this.callApi(AppSettings.DELETE_ROOM_CONFIG_API, 'post', body);
  }



  // venkat sai


  // add Registration 
  addRegistrtion(data) {
    return this.callApi(AppSettings.ADD_REGISTRATION_API, 'post', data);
  }


  // add complaints 
  addComplaints(data) {
    return this.callApi(AppSettings.ADD_COMPLAINTS_API, 'post', data);
  }

  // add notifications 
  addNotification(data) {
    return this.callApi(AppSettings.ADD_NOTIFICATION_API, 'post', data);
  }
  // get notifications
  getNotifications() {
    const body = {}
    return this.callApi(AppSettings.GET_NOTIFICATIONS_API, 'get', body);
  }
  // add Instructions
  addInstructions(data) {
    return this.callApi(AppSettings.ADD_INSTRUCTIONS_API, 'post', data);
  }

  // get Instructions
  getInstructions() {
    const body = {}
    return this.callApi(AppSettings.GET_INSTRUCTIONS_API, 'get', body);
  }
  // add Events
  addEvents(data) {
    return this.callApi(AppSettings.ADD_EVENTS_API, 'post', data);
  }

  // get events
  getEvents() {
    const body = {}
    return this.callApi(AppSettings.GET_EVENTS_API, 'get', body);
  }

  // get complaints/issues lest
  getComplaintList(body) {

    return this.callApi(AppSettings.GET_COMPLAINTS_API, 'post', body);
  }

  // add New Bill Type
  addBillType(body) {

    return this.callApi(AppSettings.ADD_BILL_TYPE_API, 'post', body);
  }


  // Get Bill Types
  getBillTypes() {

    return this.callApi(AppSettings.GET_BILL_TYPES_API, 'get', {});
  }

  // delete Bill Type by bid
  deleteBillType(body) {

    return this.callApi(AppSettings.DELETE_BILL_TYPE_API, 'post', body);
  }

  // Add Payment Data
  addpaymentData(body) {

    return this.callApi(AppSettings.ADD_PAYMENT_DATA_API, 'post', body);
  }


   // get maintenance data
   getmaintenancedata(body) {
    
        return this.callApi(AppSettings.GET_PAYMENT_DATA_API, 'post', body);
      }
  // responsible for making api calls
  callApi(url: string, method: string, body: Object): Observable<any> {
    console.log(`Http call - url: ${url}, body: ${JSON.stringify(body)}`);

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    // if user is logged in, append token to header
    if (localStorage.getItem('currentUser')) {
      headers.append('token', localStorage.getItem('currentUser'));
    }

    switch (method) {
      case 'post': return this._http.post(url, body, options).map((response: Response) => response.json());
      case 'get': return this._http.get(url, options).map((response: Response) => response.json());
    }
  }
}
