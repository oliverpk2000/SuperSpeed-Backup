import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginManagementService} from "../login-management.service";
import {Runner} from "../objects/runner";
import {ContentApiService} from "../content-api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  runnerList: Runner[] = [];

  constructor(private loginManager: LoginManagementService, private contentApi: ContentApiService) {
  }

  loginForm = new FormGroup({
    runnerId: new FormControl(0),
    runnerName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    dateJoined: new FormControl(new Date()),
    password: new FormControl('', [Validators.required]),
    adminFlag: new FormControl(false),
  })

  ngOnInit(): void {
    this.getRunners();
    let runner = this.loginManager.getRunner();
    this.loginForm.patchValue(
      {
        runnerName: runner.runnerName,
        email: runner.email,
        password: runner.password
      }
    )
  }

  login() {
    let runner: Runner = this.loginForm.value as Runner;
    if(this.validateRunnerList(runner, this.runnerList)){
      this.loginManager.setRunner(runner);
      this.loginManager.login()
    }else{
      console.log("aint happenin");
    }
  }

  getRunners() {
    this.contentApi.getAllRunners().subscribe((res) => {
      this.runnerList = res
    })
  }

  validateRunnerList(possibleRunner: Runner, realRunnerList: Runner[]) {
    let check = false;
    for (let realRunner of realRunnerList) {
      check = this.compareRunnerData(possibleRunner, realRunner);
    }
    return check;

  }

  compareRunnerData(runner1: Runner, runner2: Runner): boolean {
    if (runner1.runnerName !== runner2.runnerName) {
      return false;
    }
    if (runner1.email !== runner2.email) {
      return false;
    }
    return runner1.password === runner2.password;
  }
}
