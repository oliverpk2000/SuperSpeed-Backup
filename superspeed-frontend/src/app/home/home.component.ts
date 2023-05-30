import { Component, OnInit } from '@angular/core';
import {LoginManagementService} from "../login-management.service";
import {ContentApiService} from "../content-api.service";
import {Game} from "../objects/game";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginManager: LoginManagementService, public contenApiService:ContentApiService) {

  }
  games:Game[] = []

  ngOnInit(): void {
    if(!this.loginManager.checkLoginState()){
      this.loginManager.logout();
    }

    this.contenApiService.getAllGames().subscribe((res)=>{
      this.games = res;
    })
  }

  logout() {
    this.loginManager.logout();
  }
}
