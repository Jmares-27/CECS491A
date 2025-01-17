import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { MyAccountComponent } from "./my-account/my-account.component";
import {Route, Routes} from '@angular/router'
import { AuthGuard } from "./_services/authGuard";

import { DeleteAccountComponent } from "./delete-account/delete-account.component";
import { PasswordresetComponent } from "./passwordreset/passwordreset.component";
import { BugReportComponent } from "./bug-report/bug-report.component";
import { BugReportSuccessComponent } from "./bug-report-success/bug-report-success.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { SteamLoadingPageComponent } from "./steam-loading-page/steam-loading-page.component";
import { UserComponent } from "./user/user.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { AboutUsComponent } from "./about-us/about-us.component";

export const appRoutes: Routes =[
    {path: 'home', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'myaccount', component: MyAccountComponent, canActivate: [AuthGuard]},
    {path: 'myaccount/:steamid', component: MyAccountComponent, canActivate: [AuthGuard]},
    {path: 'aboutus', component: AboutUsComponent},

    {path: 'passwordreset', component: PasswordresetComponent, canActivate: [AuthGuard]},
    {path: 'bugreport', component: BugReportComponent, canActivate: [AuthGuard]},
    {path: 'bugreportsuccess', component: BugReportSuccessComponent, canActivate: [AuthGuard]},
    {path: 'favorites', component:FavoritesComponent, canActivate: [AuthGuard]},
    {path: 'deleteaccount', component:DeleteAccountComponent, canActivate: [AuthGuard]},
    {path: 'steamLoadingPage', component:SteamLoadingPageComponent, canActivate: [AuthGuard]},
    {path: 'user/:userid', component:UserComponent},
    {path: 'myinventory', component:InventoryComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo:'home'}
]