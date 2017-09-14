import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';



import { AuthGuard } from "./guards/auth.guard";
import { AuthenticationService } from "./services/authentication.service";
import { ApiService } from "./services/api.service";


//third party
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { DataTableModule } from "angular2-datatable";
import { MyDatePickerModule } from 'mydatepicker';
import { TooltipModule } from "ng2-tooltip";
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { PopupModule } from 'ng2-opd-popup';



import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { LoginComponent } from "./login/login.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeaderComponent } from "./common/header/header.component";
import { SidemenuComponent } from "./common/sidemenu/sidemenu.component";
import { BookingsComponent } from "./bookings/bookings.component";
import { StudregisComponent } from "./studregis/studregis.component";
import { FeeconfigComponent } from "./feeconfig/feeconfig.component";
import { RoomtypeComponent } from "./roomtype/roomtype.component";
import { DatatablesPipe } from "./datatables.pipe";
import { AllotComponent } from './allot/allot.component';
import { RoomsconfigComponent } from './roomsconfig/roomsconfig.component';
// import { AssignroomsComponent } from './assignrooms/assignrooms.component';
// import { ChangeroomComponent } from './changeroom/changeroom.component';
import { AssainroomstestComponent } from './assainroomstest/assainroomstest.component';
import { RegistrationComponent } from "./registration/registration.component";
import { ComplaintsComponent } from "./complaints/complaints.component";
import { ComplaintslistComponent } from "./complaintslist/complaintslist.component";
import { InstructionsComponent } from "./instructions/instructions.component";
import { MaintenancepaymentComponent } from './maintenancepayment/maintenancepayment.component';
import { MaintenancehistoryComponent } from './maintenancehistory/maintenancehistory.component';
import { BilltypesComponent } from './billtypes/billtypes.component';
import { HostelconfigComponent } from './hostelconfig/hostelconfig.component';
import { HostelerslistComponent } from './hostelerslist/hostelerslist.component';
import { MessinchargeComponent } from './messincharge/messincharge.component';
import { MenulistComponent } from './menulist/menulist.component';
import { PurchaserComponent } from './purchaser/purchaser.component';
import { PurchaseitemsComponent } from './purchaseitems/purchaseitems.component';
import { PurchasersComponent } from './purchasers/purchasers.component';
import { ReportsComponent } from './reports/reports.component';
import { UploadService } from './upload.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidemenuComponent,
    BookingsComponent,
    StudregisComponent,
    FeeconfigComponent,
    RoomtypeComponent,
    DatatablesPipe,
    AllotComponent,
    RoomsconfigComponent,
    // AssignroomsComponent,
    // ChangeroomComponent,
    AssainroomstestComponent,
    RegistrationComponent,
    ComplaintsComponent,
    ComplaintslistComponent,
    InstructionsComponent,
    MaintenancepaymentComponent,
    MaintenancehistoryComponent,
    BilltypesComponent,
    HostelconfigComponent,
    HostelerslistComponent,
    MessinchargeComponent,
    MenulistComponent,
    PurchaserComponent,
    PurchaseitemsComponent,
    PurchasersComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToasterModule,
    PopupModule.forRoot(),
    routing,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    DataTableModule,
    MyDatePickerModule,
    TooltipModule,
    AngularMultiSelectModule
  ],
  providers: [AuthGuard,
    AuthenticationService,
    ApiService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
