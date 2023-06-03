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

  constructor(public loginManager: LoginManagementService, public contenApiService:ContentApiService) {}

  games:Game[] = [];
  searchbarVal:string = "";

  ngOnInit(): void {
    //getting all necessaryassets to show content
    console.log("here 2 ");
    if(!this.loginManager.checkLoginState() && !this.loginManager.getGuestState()){
      console.log("here 3");
      this.loginManager.logout();
    }

    this.contenApiService.getAllGames().subscribe((res)=>{
      this.games = res;
    })
  }

  logout() {
    //back to login screen
    this.loginManager.logout();
  }

  matchSearch(){
    let matching = []

    if(this.searchbarVal===""){
      return this.games;
    }

    for (let i = 0; i < this.games.length; i++) {
      if(this.games[i].gameName.toLowerCase().match(this.searchbarVal.toLowerCase())){
        matching.push(this.games[i]);
      }
    }
    return matching;
  }
}
