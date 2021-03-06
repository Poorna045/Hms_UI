import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingsComponent } from "./bookings/bookings.component";
import { StudregisComponent } from "./studregis/studregis.component";
import { FeeconfigComponent } from "./feeconfig/feeconfig.component";
import { RoomtypeComponent } from "./roomtype/roomtype.component";
import { AllotComponent } from "./allot/allot.component";
import { RoomsconfigComponent } from "./roomsconfig/roomsconfig.component";
// import { AssignroomsComponent } from "./assignrooms/assignrooms.component";
// import { ChangeroomComponent } from "./changeroom/changeroom.component";
import { AssainroomstestComponent } from "./assainroomstest/assainroomstest.component";
import { InstructionsComponent } from "./instructions/instructions.component";
import { ComplaintsComponent } from "./complaints/complaints.component";
import { ComplaintslistComponent } from "./complaintslist/complaintslist.component";
import { RegistrationComponent } from "./registration/registration.component";
import { MaintenancepaymentComponent } from "./maintenancepayment/maintenancepayment.component";
import { MaintenancehistoryComponent } from "./maintenancehistory/maintenancehistory.component";
import { BilltypesComponent } from "./billtypes/billtypes.component";
import { HostelconfigComponent } from "./hostelconfig/hostelconfig.component";
import { HostelerslistComponent } from "./hostelerslist/hostelerslist.component";
import { MessinchargeComponent } from './messincharge/messincharge.component';
import { MenulistComponent } from './menulist/menulist.component';
import { PurchaseitemsComponent } from './purchaseitems/purchaseitems.component';
import { PurchasersComponent } from './purchasers/purchasers.component';
import { ReportsComponent } from './reports/reports.component';
import { PurchaserComponent } from './purchaser/purchaser.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/:page', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard] },
  { path: 'registration', component: RegistrationComponent, canActivate: [AuthGuard] },
  { path: 'roomtype', component: RoomtypeComponent, canActivate: [AuthGuard] },
  { path: 'feeconfig', component: FeeconfigComponent, canActivate: [AuthGuard] },
  { path: 'allot', component: AllotComponent, canActivate: [AuthGuard] },
  { path: 'roomsconfig', component: RoomsconfigComponent, canActivate: [AuthGuard] },
  // { path: 'assignrooms', component: AssignroomsComponent, canActivate: [AuthGuard] },
  // { path: 'changeroom', component: ChangeroomComponent, canActivate: [AuthGuard] },
  { path: 'assainroomstest', component: AssainroomstestComponent, canActivate: [AuthGuard] },
  { path: 'instructions', component: InstructionsComponent, canActivate: [AuthGuard] },
  { path: 'complaints', component: ComplaintsComponent, canActivate: [AuthGuard] },
  { path: 'complaintslist', component: ComplaintslistComponent, canActivate: [AuthGuard] },
  { path: 'maintenancehistory', component: MaintenancehistoryComponent, canActivate: [AuthGuard] },
  { path: 'maintenancepayment', component: MaintenancepaymentComponent, canActivate: [AuthGuard] },
  { path: 'servicestype', component: BilltypesComponent, canActivate: [AuthGuard] },
  { path: 'hostelconfig', component: HostelconfigComponent, canActivate: [AuthGuard] },
  { path: 'hostelers', component: HostelerslistComponent, canActivate: [AuthGuard] },


  //MESS

  { path: 'messincharg', component: MessinchargeComponent, canActivate: [AuthGuard] },
  { path: 'menulist', component: MenulistComponent, canActivate: [AuthGuard] },
  { path: 'purchase', component: PurchaserComponent, canActivate: [AuthGuard] },
  { path: 'purchaseitems', component: PurchaseitemsComponent, canActivate: [AuthGuard] },
  { path: 'purchases', component: PurchasersComponent, canActivate: [AuthGuard] },
  { path: 'report', component: ReportsComponent, canActivate: [AuthGuard] },


  { path: '', redirectTo: "dashboard", pathMatch: "full" },
  { path: '**', redirectTo: 'dashboard', pathMatch: "full" }
];

export const routing = RouterModule.forRoot(appRoutes);



