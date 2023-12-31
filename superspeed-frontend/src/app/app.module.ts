import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import {LoginManagementService} from "./login-management.service";
import {HttpClientModule} from "@angular/common/http";
import {InfoDisplayComponent} from "./info-display/info-display.component";
import {TimeFormatPipe} from "./display comps/time-format.pipe";
import {GameDisplayComponent} from "./display comps/game-display/game-display.component";
import { ProfileComponent } from './profile/profile.component';
import { StopwatchComponent } from './stopwatch/stopwatch.component';
import { TimerComponent } from './stopwatch/timer/timer.component';
import { UsersComponent } from './users/users.component';
import { UserDisplayComponent } from './display comps/user-display/user-display.component';
import {RegisterComponent} from "./register/register.component";
//write routes here if you want to add page
const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home/game/:gameId', component: InfoDisplayComponent},
  {path: 'profile/:runnerId', component: ProfileComponent},
  {path: 'stopwatch', component: StopwatchComponent},
  {path: 'users', component: UsersComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent,
    GameDisplayComponent,
    InfoDisplayComponent,
    TimeFormatPipe,
    ProfileComponent,
    StopwatchComponent,
    TimerComponent,
    RegisterComponent,
    UsersComponent,
    UserDisplayComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [LoginManagementService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
