import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { AppSettings } from '../app.settings';

@Injectable()
export class ApiService {


  public year;
  public month;
  public day;
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


    // clear the registered data 
    ClearTheData(data) {
      return this.callApi(AppSettings.CLEAR_REGISTER_DATA_VISIBLE_API, 'post', data);
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


  visibledatainSelc(body) {
    
        return this.callApi(AppSettings.VISI_SELC_API, 'post', body);
      }

   // get valid registered user
   getvalidtest(body) {
    return this.callApi(AppSettings.GET_VALID_USER_TEST_API, 'post', body);
  }

     // change registered user
     changeRegistration(body) {
      return this.callApi(AppSettings.CHANGE_REGISTRATION_API, 'post', body);
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


  // Empty Rooms
  emptyTheRooms(body) {
    return this.callApi(AppSettings.EMPTY_THE_ROOM_API, 'post', body);
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

  // Add Payment Data
  getStudDataExReg() {

    return this.callApi(AppSettings.GET_STUD_EX_REG_API, 'get', {});
  }


  // get maintenance data
  getmaintenancedata(body) {

    return this.callApi(AppSettings.GET_PAYMENT_DATA_API, 'post', body);
  }

  // get Student data by id
  getStudDataByid(body) {

    return this.callApi(AppSettings.GET_STUD_DATA_BY_ID_API, 'post', body);
  }

  // get Hostel Config Data
  gethostelconfig() {

    return this.callApi(AppSettings.GET_HOSTEL_CONFIG_API, 'get', {});
  }

  // add Hostel Config Data
  addhostelconfig(body) {

    return this.callApi(AppSettings.ADD_HOSTEL_CONFIG_API, 'post', body);
  }

  // edit Hostel Config Data
  edithostelconfig(body) {

    return this.callApi(AppSettings.EDIT_HOSTEL_CONFIG_API, 'post', body);
  }

  // delete Hostel Config Data
  deletehostelonfig(body) {

    return this.callApi(AppSettings.DELETE_HOSTEL_CONFIG_API, 'post', body);
  }

  // change status in roomtypes according to hostel
  changeTypeStatus(body) {

    return this.callApi(AppSettings.CHANGE_STATUS_TYPE_API, 'post', body);
  }

  // getusersdata for registration by utype
  getUsersDataR(body) {

    return this.callApi(AppSettings.GET_USERS_DATA_R_API, 'post', body);
  }
  // get rooms list by hid 
  getroomslistByhid(body) {

    return this.callApi(AppSettings.GET_ROOMS_LIST_BY_HID_API, 'post', body);
  }

  // get occupancy list  
  getOccupancyData(body) {

    return this.callApi(AppSettings.GET_OCCUPY_DATA_API, 'post', body);
  }

  // get registered users List  
  getregisteredUsers() {

    return this.callApi(AppSettings.GET_REGIS_USERS_DATA_API, 'get', {});
  }


  // delete registered user  
  deleteuser(body) {

    return this.callApi(AppSettings.DEL_REGIS_USER_API, 'post', body);
  }

  // delete all registered users  
  deleteAllUsers(body) {

    return this.callApi(AppSettings.DEL_ALL_REGIS_USERS_API, 'post', body);
  }

  // get registration page show status  
  getRegStatus(body) {

    return this.callApi(AppSettings.GET_REG_STATUS_API, 'post', body);
  }

  // postpone/prepone booking end date  
  changeDateValue(body) {

    return this.callApi(AppSettings.CHANGE_BOOKING_END_DATE_API, 'post', body);
  }


  //MESS



  getlist() {
    const body = {}
    return this.callApi(AppSettings.GETLIST_API, 'get', body);
  }
  insertlist(data) {
    return this.callApi(AppSettings.INSERTLIST_API, 'post', data);
  }
  itemoutlist(data) {
    return this.callApi(AppSettings.ITEMOUTLIST_API, 'post', data);
  }
  addnewitem(data) {
    return this.callApi(AppSettings.ADDNEWITEM_API, 'post', data);
  }
  menulist(data) {
    return this.callApi(AppSettings.MENULIST_API, 'post', data);
  }
  getmenulist() {
    const body = {}
    return this.callApi(AppSettings.GETMENULIST_API, 'get', body);
  }
  updatelist(data) {
    return this.callApi(AppSettings.UPDATELIST_API, 'post', data);
  }

  stockRegister() {
    const body = {}
    return this.callApi(AppSettings.STOCKREGISTER_API, 'get', body);
  }
  stockBalance() {
    const body = {}
    return this.callApi(AppSettings.STOCKBALANCE_API, 'get', body);
  }
  getunits(data) {
 
    return this.callApi(AppSettings.GETUNITS_API, 'post', data);
  }

  purchaserlist(data) {
    console.log(data);
    return this.callApi(AppSettings.PURCHASERLIST_API, 'post', data);
  }

  purchaseItemsList() {
    const body = {}
    return this.callApi(AppSettings.PURCHASEITEMSLIST_API, 'get', body);
  }

  updatemateriallist(data) {
    return this.callApi(AppSettings.UPDATEMATERIALLIST_API, 'post', data);
  }

  deleteitem(data) {
    return this.callApi(AppSettings.DELETEITEM_API, 'post', data);
  }
  selected_PurchaseData(data) {
    return this.callApi(AppSettings.SELECTED_PURCHASEDATA, 'post', data);
  }

  itembuy(body) {
    return this.callApi(AppSettings.ITEMBUY_API, 'post', body);
  }

  getCategories() {
    const body = {}
    return this.callApi(AppSettings.GETCATEGORIES_API, 'get', body);
  }

  getItemsbyCategory(value) {
    return this.callApi(AppSettings.GETITEMSBYCATEGORY_API, 'post', value);
  }

  getnames() {
    const body = {}
    return this.callApi(AppSettings.GETNAMES_API, 'get', body);

  }
  purchaserdetails(body) {
    return this.callApi(AppSettings.PURCHASERDETAILS_API, 'post', body);
  }
  status(body) {
    return this.callApi(AppSettings.STATUS_API, 'post', body);
  }

  purchasernames(body) {
    return this.callApi(AppSettings.PURCHASERS_NAME_API, 'post', body);
  }
  purchaserupdate(body) {
    return this.callApi(AppSettings.PURCHASERS_UPDATE_API, 'post', body);
  }
  delete1(body) {
    return this.callApi(AppSettings.PURCHASERS_DELETE_API, 'post', body);
  }

  addcategory(body) {
    return this.callApi(AppSettings.ADDCATEGORY_API, 'post', body);
  }
  getCategoriesfornewItem() {
    const body = {}
    return this.callApi(AppSettings.GETCATEGORIESFORNEWITEM, 'get', body);
  }

  getlastInsertDate() {
    const body = {}
    return this.callApi(AppSettings.GETLASTINSERTDATE, 'get', body);
  }

  getImagesbyId(id: any, billno: any) {
    const body = JSON.stringify({ 'id': id, 'billno': billno });
    return this.callApi(AppSettings.GETIMAGESBYID, 'post', body);
  }
  reports(body) {
    return this.callApi(AppSettings.REPORTSDATE_API, 'post', body);
  }
  details(body) {
    return this.callApi(AppSettings.DETAILS_API, 'post', body);
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
