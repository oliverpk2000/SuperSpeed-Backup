import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import {LoginManagementService} from "./login-management.service";
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [LoginManagementService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
