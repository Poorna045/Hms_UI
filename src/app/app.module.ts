import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpModule } from '@angular/http';



import { AuthGuard } from "./guards/auth.guard";
import { AuthenticationService } from "./services/authentication.service";
import { ApiService } from "./services/api.service";


//third party
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {DataTableModule} from "angular2-datatable";
import { MyDatePickerModule } from 'mydatepicker';
import {TooltipModule} from "ng2-tooltip";
import {PopupModule} from 'ng2-opd-popup';



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
import { AssignroomsComponent } from './assignrooms/assignrooms.component';
import { ChangeroomComponent } from './changeroom/changeroom.component';
import { AssainroomstestComponent } from './assainroomstest/assainroomstest.component';
import { RegistrationComponent } from "./registration/registration.component";
import { ComplaintsComponent } from "./complaints/complaints.component";
import { ComplaintslistComponent } from "./complaintslist/complaintslist.component";
import { InstructionsComponent } from "./instructions/instructions.component";
import { MaintenancepaymentComponent } from './maintenancepayment/maintenancepayment.component';
import { MaintenancehistoryComponent } from './maintenancehistory/maintenancehistory.component';
import { BilltypesComponent } from './billtypes/billtypes.component';


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
    AssignroomsComponent,
    ChangeroomComponent,
    AssainroomstestComponent,
    RegistrationComponent,
    ComplaintsComponent,
    ComplaintslistComponent,
    InstructionsComponent,
    MaintenancepaymentComponent,
    MaintenancehistoryComponent,
    BilltypesComponent,
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
     TooltipModule
  ],
  providers: [ AuthGuard,
    AuthenticationService,
    ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
