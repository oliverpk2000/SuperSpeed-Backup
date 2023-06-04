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
  gameName:string;
  releaseDate = new Date();

  ngOnInit(): void {
    //getting all necessaryassets to show content
    if(!this.loginManager.checkLoginState() && !this.loginManager.getGuestState()){
      this.loginManager.logout();
    }
    this.update();
  }

  update(){
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

  addGame(){
    this.contenApiService.postGame({gameId:0, gameName: this.gameName, datePublished:this.releaseDate}).subscribe()
    this.gameName=""
    this.releaseDate = new Date();
    this.update();
  }
}
