import { Component, OnInit } from '@angular/core';
import {LoginManagementService} from "../login-management.service";
import {ContentApiService} from "../content-api.service";
import {Runner} from "../objects/runner";

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {

  constructor(public loginManager: LoginManagementService, public contentApiService:ContentApiService) { }

  user: Runner = {runnerId: 0, runnerName: "", email: "", dateJoined: new Date(), password: "", adminFlag: 0}

  ngOnInit(): void {
    this.loginManager.getRunner();
  }

}
