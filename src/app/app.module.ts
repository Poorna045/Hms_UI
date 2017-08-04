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
import {PopupModule} from 'ng2-opd-popup';
import {DataTableModule} from "angular2-datatable";
import { MyDatePickerModule } from 'mydatepicker';


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
    ChangeroomComponent
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
     MyDatePickerModule
  ],
  providers: [ AuthGuard,
    AuthenticationService,
    ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
