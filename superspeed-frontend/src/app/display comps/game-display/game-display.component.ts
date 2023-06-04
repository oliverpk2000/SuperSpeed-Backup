import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Game} from "../../objects/game";
import {LoginManagementService} from "../../login-management.service";
import {ContentApiService} from "../../content-api.service";

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css']
})
export class GameDisplayComponent implements OnInit {
  //input des games was ausgegeben werden soll im html
  @Input() game:Game = {gameId:0, gameName: "", datePublished: new Date()};
  @Output() updateCall = new EventEmitter<any>;

  constructor(public loginManager:LoginManagementService, public contenApiService:ContentApiService) { }

  ngOnInit(): void {
  }

  //event to stop routerLink from directing to other url
  deleteGame(event: Event){
    //stops routerlink sending you somewhere else
    event.stopPropagation();
    this.contenApiService.deleteGame(this.game).subscribe();
    this.updateCall.emit();
  }

}
