import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../../objects/game";

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css']
})
export class GameDisplayComponent implements OnInit {
  //input des games was ausgegeben werden soll im html
  @Input() game:Game = {gameId:0, gameName: "", datePublished: new Date()};

  constructor() { }

  ngOnInit(): void {
  }

}
