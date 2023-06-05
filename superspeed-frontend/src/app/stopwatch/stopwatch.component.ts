import {Component, OnInit} from '@angular/core';
import {LoginManagementService} from "../login-management.service";
import {Runner} from "../objects/runner";

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {

  constructor(public loginManager: LoginManagementService) {
  }

  user: Runner = {runnerId: 0, runnerName: "", email: "", dateJoined: new Date(), password: "", adminFlag: 0}

  splits: string[] = []
  split: string = "";
  started:boolean = false;
  //very sketchy way of reinitializing the component by setting ngIf false and then true again
  reinitialize = true;

  ngOnInit(): void {
    this.user = this.loginManager.getRunner();
  }

  addSplit() {
    this.splits.push(this.split);
    this.split = "";
  }

  reinitializeFully(){
    this.started = false;
    this.splits = []
    this.reinitializeAction()
  }

  reinitializeAction(){
    //waiting for 10 milliseconds because it would not reinitialize without timeou
    this.reinitialize = false
    setTimeout(() => {
      this.reinitialize = true;
    }, 10);
  }
}
