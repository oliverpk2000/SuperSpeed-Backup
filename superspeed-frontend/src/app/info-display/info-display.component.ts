import {Component, OnInit} from '@angular/core';
import {Game} from "../objects/game";
import {ContentApiService} from "../content-api.service";
import {ActivatedRoute} from "@angular/router";
import {Speedrun} from "../objects/speedrun";
import {Runner} from "../objects/runner";
import {forkJoin} from "rxjs";
import {Category} from "../objects/category";
import {LoginManagementService} from "../login-management.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-info-display',
  templateUrl: './info-display.component.html',
  styleUrls: ['./info-display.component.css']
})

/** written by Tobias Sprecher */
export class InfoDisplayComponent implements OnInit {
  game: Game = {gameId: 0, gameName: "", datePublished: new Date()};
  speedruns: Speedrun[] = [];
  runners: Map<number, Runner> = new Map<number, Runner>();
  categories: Category[] = [];

  sortingVal: string = "fts";
  approvedVal: string = "app";
  categoryVal: number = 0;

  speedrunAdding:boolean = false


  timeForm = new FormGroup({
    //i cant really explain the regex but d{n} means n*number or something and :\ means : so it requires NN:NN:NN:NNN
    timeInput: new FormControl('', [Validators.required, Validators.pattern(/^\d{2}:\d{2}:\d{2}:\d{3}$/)]),
    dateInput: new FormControl(new Date(), [Validators.required]),
    categorySelect: new FormControl(0, Validators.required)
  })

  constructor(public contentApiService: ContentApiService, public loginManager:LoginManagementService, private route: ActivatedRoute) {
  }

  //Activated route to read from the URL
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      //getting gameId from URL -- format /superspeed/game/*gameId*
      const gameId = Number(params['gameId']);
      //getting the game, with this gameId
      this.contentApiService.getGame(gameId).subscribe((res) => {
        this.game = res;
        //inside this subscribe to ensure that it is not executed before the game is fetched
        this.update()
      });
    })

  }

  update(){
    //getting speedruns, that have the same gameId as this game
    this.contentApiService.getAllSpeedrunsWithGameId(this.game.gameId).subscribe((res) => {
      res.forEach(speedrun => speedrun.runDate = new Date(speedrun.runDate))
      this.speedruns = res;
      //making map of all speedruns and their runner;
      this.getRunnersForSpeedun();
    });
    //getting all the categories
    this.contentApiService.getAllCategories().subscribe((res) => {
      this.categories = res;
    });
  }

  // function to get the runner of a speedrun of this game speedrun
  // this function is this complicated, because of the async the programm could acces the map before all the values are present in the map
  getRunnersForSpeedun() {
    // Arrays.map() turns the speedruns array into an array of Observables
    // for each element in speedruns the runner with the runnerId from this speedrun is fetched
    const runnerObservables = this.speedruns.map(speedrun => {
      return this.contentApiService.getrunner(speedrun.runnerId);
    });
    // to wait for all the observables to complete we use forkJoin, since the functions are async, that means that all the elements could not yet be fetched
    // ForkJoin also combines all the observables in the list into a single observable, that emits an array of responses
    forkJoin(runnerObservables).subscribe(responses => {
      //responses contains the runners that were fetched in the speedruns.map in the same order that they were fetched
      //now these runners are added to the list with the runId as the key and the runner as the value
      for (let i = 0; i < responses.length; i++) {
        let runId = this.speedruns[i].runId;
        this.runners.set(runId, responses[i]);
      }
      //runs being sortet standard = fastest to slowest
      this.sortRuns();
    });
  }

  //sorts the speedruns array based on the selected value of the select
  sortRuns() {
    if (this.sortingVal === "fts") {
      this.speedruns.sort((speedrun1: Speedrun, speedrun2: Speedrun) => speedrun1.timeScore - speedrun2.timeScore);
    } else if (this.sortingVal === "stf") {
      this.speedruns.sort((speedrun1: Speedrun, speedrun2: Speedrun) => speedrun2.timeScore - speedrun1.timeScore);
    } else if (this.sortingVal === "nto") {
      this.speedruns.sort((speedrun1: Speedrun, speedrun2: Speedrun) => speedrun2.runDate.getTime() - speedrun1.runDate.getTime());
    } else if (this.sortingVal === "otn") {
      this.speedruns.sort((speedrun1: Speedrun, speedrun2: Speedrun) => speedrun1.runDate.getTime() - speedrun2.runDate.getTime());
    }
  }

  //returns an array of the runs, that match the category
  conditionSpeedruns() {
    //catId is default 0, meaning all any% for example
    let catRuns = this.speedruns.filter((speedrun) => speedrun.catId === this.categoryVal);
    if (this.approvedVal === "all") {
      return catRuns;
    } else if (this.approvedVal === "app") {
      let appCatRuns = catRuns.filter((speedrun) => speedrun.approved === 1);
      return appCatRuns;
    } else {
      let appCatRuns = catRuns.filter((speedrun) => speedrun.approved === 0);
      return appCatRuns;
    }
  }

  approveAction(speedrun:Speedrun){
    let newSpeedrun = {gameId: speedrun.gameId, runnerId: speedrun.runnerId, catId:speedrun.catId,
      runId:speedrun.runId, timeScore:speedrun.timeScore, runDate: speedrun.runDate, approved: 1};
    this.contentApiService.updateSpeedruns(newSpeedrun).subscribe();
    this.update()
  }

  disapproveAction(speedrun:Speedrun){
    let newSpeedrun = {gameId: speedrun.gameId, runnerId: speedrun.runnerId, catId:speedrun.catId,
      runId:speedrun.runId, timeScore:speedrun.timeScore, runDate: speedrun.runDate, approved: 0};
    this.contentApiService.updateSpeedruns(newSpeedrun).subscribe();
    this.update()
  }

  deleteAction(speedrun:Speedrun){
    this.contentApiService.deleteSpeedrun(speedrun).subscribe();
    this.update()
  }

  addSpeedrunAction(){
    this.speedrunAdding = true;
    this.update()
  }

  submitSpeedrunAction(){
    //getting the timeInput from the formgroup and turning it into milliseconds
    const timeValue = this.timeForm.get('timeInput').value;
    const times = timeValue.split(':').map(Number);
    const totalMilliseconds = (times[0] * 60 * 60 * 1000) + (times[1] * 60 * 1000) + (times[2] * 1000) + times[3];
    //getting the category from the select in the form
    const categoryId = this.timeForm.get('categorySelect').value;
    //getting the date from the input in the form
    const date = this.timeForm.get('dateInput').value;
    //runId will be replaced anyway so just set it 0
    const newSpeedrun = {gameId:this.game.gameId, runnerId: this.loginManager.getRunner().runnerId, catId: categoryId,
      runId: 0, timeScore: totalMilliseconds, runDate:date, approved: 0}
    //creating new speedrun in the backend
    this.contentApiService.postSpeedrun(newSpeedrun).subscribe();
    //updating the speedrunlist, so that the changes can be seen without reloading the page
    this.update();
    this.speedrunAdding = false;
  }
}
