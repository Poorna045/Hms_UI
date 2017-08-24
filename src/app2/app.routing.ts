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
import { AssignroomsComponent } from "./assignrooms/assignrooms.component";
import { ChangeroomComponent } from "./changeroom/changeroom.component";
import { AssainroomstestComponent } from "./assainroomstest/assainroomstest.component";

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'dashboard/:page', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'bookings', component: BookingsComponent, canActivate: [AuthGuard] },
    { path: 'registration', component: StudregisComponent, canActivate: [AuthGuard] },
    { path: 'roomtype', component: RoomtypeComponent, canActivate: [AuthGuard] },
    { path: 'feeconfig', component: FeeconfigComponent, canActivate: [AuthGuard] },
    { path: 'allot', component: AllotComponent, canActivate: [AuthGuard] },
    { path: 'roomsconfig', component: RoomsconfigComponent, canActivate: [AuthGuard] },
    { path: 'assignrooms', component: AssignroomsComponent, canActivate: [AuthGuard] },
    { path: 'changeroom', component: ChangeroomComponent, canActivate: [AuthGuard] },
      { path: 'assainroomstest', component: AssainroomstestComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: "login", pathMatch: "full" },
    { path: '**', redirectTo: 'dashboard', pathMatch: "full" }
];

export const routing = RouterModule.forRoot(appRoutes);



