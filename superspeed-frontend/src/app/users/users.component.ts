import { Component, OnInit } from '@angular/core';
import {RunnerApiService} from "../api/runner-api.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(public runnerApiService:RunnerApiService) { }

  ngOnInit(): void {
  }

}
