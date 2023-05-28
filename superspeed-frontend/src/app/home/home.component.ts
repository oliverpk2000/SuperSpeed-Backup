import { Component, OnInit } from '@angular/core';
import {LoginManagementService} from "../login-management.service";
import {Runner} from "../objects/runner";
import {ContentApiService} from "../content-api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public loginManager: LoginManagementService, public contenApiService:ContentApiService) {

  }
  runners:Runner[] = []

  ngOnInit(): void {
    //getting all necessaryassets to show content
    console.log("here 2 ");
    if(!this.loginManager.checkLoginState() && !this.loginManager.getGuestState()){
      console.log("here 3");
      this.loginManager.logout();
    }

    this.contenApiService.getAllRunners().subscribe((res)=>{
      this.runners = res;
    })
  }

  logout() {
    //back to login screen
    this.loginManager.logout();
  }
}
