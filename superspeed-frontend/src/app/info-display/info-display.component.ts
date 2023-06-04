import { Component, OnInit } from '@angular/core';
import {Game} from "../objects/game";
import {ContentApiService} from "../content-api.service";
import {ActivatedRoute} from "@angular/router";
import {Speedrun} from "../objects/speedrun";
import {Runner} from "../objects/runner";
import {forkJoin} from "rxjs";
import {Category} from "../objects/category";

@Component({
  selector: 'app-info-display',
  templateUrl: './info-display.component.html',
  styleUrls: ['./info-display.component.css']
})

/** written by Tobias Sprecher */
export class InfoDisplayComponent implements OnInit {
  game:Game = {gameId: 0, gameName: "", datePublished:new Date()};
  speedruns:Speedrun[] = [];
  runners:Map<number, Runner> = new Map<number, Runner>();
  categories:Category[] = [];

  sortingVal:string="fts";
  approvedVal:string="app";
  categoryVal:number=0;


  constructor(public contentApiService:ContentApiService, private route: ActivatedRoute) { }

  //Activated route to read from the URL
  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      //getting gameId from URL -- format /superspeed/game/*gameId*
      const gameId = Number(params['gameId']);
      //getting the game, with this gameId
      this.contentApiService.getGame(gameId).subscribe((res)=>{
        this.game = res;
      });
      //getting speedruns, that have the same gameId as this game
      this.contentApiService.getAllSpeedrunsWithGameId(gameId).subscribe((res) =>{
        this.speedruns = res;
        //making map of all speedruns and their runner;
        this.getRunnersForSpeedun();
      });
      //getting all the categories
      this.contentApiService.getAllCategories().subscribe((res)=>{
        this.categories = res;
      });
    })
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
  sortRuns(){
    if(this.sortingVal === "fts"){
      this.speedruns.sort((speedrun1:Speedrun, speedrun2:Speedrun) => speedrun1.timeScore-speedrun2.timeScore);
    } else if(this.sortingVal === "stf"){
      this.speedruns.sort((speedrun1:Speedrun, speedrun2:Speedrun) => speedrun2.timeScore-speedrun1.timeScore);
    } else if(this.sortingVal === "nto"){
      //this does not work yet
      this.speedruns.sort((speedrun1:Speedrun, speedrun2:Speedrun) => speedrun1.runDate.valueOf()-speedrun2.runDate.valueOf());
    } else if(this.sortingVal === "otn"){
      //this does not work yet
      this.speedruns.sort((speedrun1:Speedrun, speedrun2:Speedrun) => speedrun2.runDate.valueOf()-speedrun1.runDate.valueOf());
    }
  }

  //returns an array of the runs, that match the category
  conditionSpeedruns(){
    //catId is default 0, meaning all any% for example
    let catRuns = this.speedruns.filter((speedrun)=>speedrun.catId===this.categoryVal);
    if(this.approvedVal === "all"){
      return catRuns;
    } else if(this.approvedVal === "app"){
      let appCatRuns = catRuns.filter((speedrun)=>speedrun.approved===1);
      return appCatRuns;
    } else {
      let appCatRuns = catRuns.filter((speedrun)=>speedrun.approved===0);
      return appCatRuns;
    }
  }
}
