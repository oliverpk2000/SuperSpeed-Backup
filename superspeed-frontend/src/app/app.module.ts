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
import { GameDisplayComponent } from './display comps/game-display/game-display.component';
import { InfoDisplayComponent } from './info-display/info-display.component';
import { TimeFormatPipe } from './display comps/time-format.pipe';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home/game/:gameId', component: InfoDisplayComponent},
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
    TimeFormatPipe
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
