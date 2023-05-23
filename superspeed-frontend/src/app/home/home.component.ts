import { Component, OnInit } from '@angular/core';
import {LoginManagementService} from "../login-management.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginManager: LoginManagementService) { }

  ngOnInit(): void {
    console.log("not this time buddy")
    if(!this.loginManager.checkLoginState()){
      this.loginManager.logout();
    }
  }

  logout() {
    this.loginManager.logout();
  }
}
