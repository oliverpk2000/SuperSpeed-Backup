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

  constructor(private loginManager: LoginManagementService, public contenApiService:ContentApiService) {

  }
  runners:Runner[] = []

  ngOnInit(): void {
    console.log("not this time buddy")
    if(!this.loginManager.checkLoginState()){
      this.loginManager.logout();
    }

    this.contenApiService.getAllRunners().subscribe((res)=>{
      this.runners = res;
    })
  }

  logout() {
    this.loginManager.logout();
  }
}
