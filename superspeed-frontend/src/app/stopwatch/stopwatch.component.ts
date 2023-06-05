import {Component, OnInit} from '@angular/core';
import {LoginManagementService} from "../login-management.service";
import {SpeedrunApiService} from "../api/speedrun-api.service";
import {Runner} from "../objects/runner";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Speedrun} from "../objects/speedrun";
import {GameApiService} from "../api/game-api.service";
import {CategoryApiService} from "../api/category-api.service";

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {

  constructor(public loginManager: LoginManagementService, public categoryApiService:CategoryApiService,
              public contentApiService: SpeedrunApiService, public gameApiService:GameApiService) {
  }

  user: Runner = {runnerId: 0, runnerName: "", email: "", dateJoined: new Date(), password: "", adminFlag: 0}
  runData: Speedrun = {gameId:-1, runnerId:-1, catId:-1, runId:0, timeScore:0, runDate:new Date(), approved:0}
  setupDone: boolean = false;

  speedrunDataForm = new FormGroup({
    gameId: new FormControl(0, [Validators.required]),
    runnerId: new FormControl(0),
    catId: new FormControl(0, [Validators.required]),
    runId: new FormControl(0),
    timescore: new FormControl(0),
    runDate: new FormControl(new Date()),
    approved: new FormControl(0)
  });

  ngOnInit(): void {
    this.user = this.loginManager.getRunner();
    console.log(this.user);
  }


  submit() {
    //scuffed
    this.speedrunDataForm.patchValue({
      runnerId:this.user.runnerId
    })
    this.runData = this.speedrunDataForm.value as Speedrun;
    console.log(this.runData);
    this.setupDone = true;
  }
}
