import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Game} from "../../objects/game";
import {LoginManagementService} from "../../login-management.service";
import {SpeedrunApiService} from "../../api/speedrun-api.service";
import {GameApiService} from "../../api/game-api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {dateValidator} from "../../customValidators";

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css']
})

/** Written by Tobias Sprecher */
export class GameDisplayComponent implements OnInit {
  //input des games was ausgegeben werden soll im html
  @Input() game:Game = {gameId:0, gameName: "", datePublished: new Date()};

  constructor(public loginManager:LoginManagementService, public gameApiService:GameApiService) { }

  gameEditForm = new FormGroup({
    gameNameInput: new FormControl('', Validators.required),
    datePublishedInput: new FormControl(new Date(), [Validators.required, dateValidator])
  })

  get gameNameInput(){return this.gameEditForm.get('gameNameInput');}
  get datePublishedInput() {return this.gameEditForm.get('datePublishedInput')}

  editing:boolean = false;

  ngOnInit(): void {
  }

  //event to stop routerLink from directing to other url
  deleteGame(event: Event){
    //stops routerlink sending you somewhere else
    event.stopPropagation();
    this.gameApiService.deleteGame(this.game).subscribe();
  }

  //enables the editing form because it is onyl visible with ngif
  editingAction(){
    //stops routerlink sending you somewhere else
    event.stopPropagation();
    this.editing = true;
    this.gameEditForm.patchValue({
      gameNameInput: this.game.gameName,
      datePublishedInput: this.game.datePublished
    })
  }

  //prevents from routing when clicking on the inputs
  preventRouting(event: MouseEvent) {
    event.stopPropagation();
  }

  submitChanges(){
    event.stopPropagation();
    const gameName= this.gameEditForm.get("gameNameInput").value;
    const datePublished = this.gameEditForm.get("datePublishedInput").value;
    this.gameApiService.updateGames({gameId:0, gameName: gameName, datePublished: datePublished}).subscribe();
  }

  cancelAction(){
    event.stopPropagation();
    this.editing = false;
  }
}
