import {Component, OnInit} from '@angular/core';
import {LoginManagementService} from "../login-management.service";
import {ContentApiService} from "../content-api.service";
import {Runner} from "../objects/runner";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Game} from "../objects/game";
import {Category} from "../objects/category";
import {Speedrun} from "../objects/speedrun";

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {

  constructor(public loginManager: LoginManagementService, public contentApiService: ContentApiService) {
  }

  user: Runner = {runnerId: 0, runnerName: "", email: "", dateJoined: new Date(), password: "", adminFlag: 0}
  games: Game[] = [];
  categories: Category[] = [];
  runData: Speedrun = {gameId:0, runnerId:0, catId:0, runId:0, timeScore:0, runDate:new Date(), approved:0}

  speedrunDataForm = new FormGroup({
    gameId: new FormControl(0, [Validators.required]),
    runnerId: new FormControl(this.user.runnerId),
    catId: new FormControl(0, [Validators.required]),
    runId: new FormControl(0),
    timescore: new FormControl(0),
    runDate: new FormControl(new Date()),
    approved: new FormControl(0)
  });

  ngOnInit(): void {
    this.user = this.loginManager.getRunner();
    this.getAllGames();
    this.getAllCategories()

  }

  getAllGames() {
    this.contentApiService.getAllGames().subscribe((res) => this.games = res);
  }

  getAllCategories(){
    this.contentApiService.getAllCategories().subscribe((res) => this.categories = res);
  }

  submit() {
    this.runData = this.speedrunDataForm.value as Speedrun;
    console.log(this.runData);
  }
}
