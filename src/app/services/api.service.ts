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
  
     vacantroom(body) {
    
    return this.callApi(AppSettings.VACANT_API, 'post', body);
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
      case 'get' : return this._http.get(url, options).map((response: Response) => response.json());
    }
  }
}
