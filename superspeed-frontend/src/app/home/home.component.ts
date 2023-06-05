import { Component, OnInit } from '@angular/core';
import {LoginManagementService} from "../login-management.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {dateValidator} from "../customValidators";
import {GameApiService} from "../api/game-api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/** Written by Tobias Sprecher */
export class HomeComponent implements OnInit {

  constructor(public loginManager: LoginManagementService, public gameApiService:GameApiService) {}

  gameForm = new FormGroup({
    gameNameInput: new FormControl('', Validators.required),
    datePublishedInput: new FormControl(new Date(), [Validators.required, dateValidator])
  })

  get gameNameInput(){return this.gameForm.get('gameNameInput');}
  get datePublishedInput() {return this.gameForm.get('datePublishedInput')}

  searchbarVal:string = "";

  ngOnInit(): void {
    //getting all necessary assets to show content
    if(!this.loginManager.checkLoginState() && !this.loginManager.getGuestState()){
      this.loginManager.logout();
    }
  }


  matchSearch(){
    let matching = []

    if(this.searchbarVal===""){
      return this.gameApiService.games;
    }

    for (let i = 0; i < this.gameApiService.games.length; i++) {
      if(this.gameApiService.games[i].gameName.toLowerCase().match(this.searchbarVal.toLowerCase())){
        matching.push(this.gameApiService.games[i]);
      }
    }
    return matching;
  }

  addGame(){
    const gameName= this.gameForm.get("gameNameInput").value;
    const datePublished = this.gameForm.get("datePublishedInput").value;
    this.gameApiService.postGame({gameId:0, gameName: gameName, datePublished: datePublished}).subscribe();
    this.gameForm.reset();
  }
}

