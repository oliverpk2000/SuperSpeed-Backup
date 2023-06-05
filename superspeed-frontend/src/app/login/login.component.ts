import {Component, Injector, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {LoginManagementService} from "../login-management.service";
import {Runner} from "../objects/runner";
import {SpeedrunApiService} from "../api/speedrun-api.service";
import {dateValidator} from "../customValidators";
import {RunnerApiService} from "../api/runner-api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public loginManager: LoginManagementService, public runnerApiService:RunnerApiService, private contentApi: SpeedrunApiService) {
  }

  loginForm = new FormGroup({
    //database will automatically set the id
    runnerId: new FormControl(0),
    //runnername must be between 3 and 50 letters
    runnerName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    //there is already a validation for email I guess
    email: new FormControl('', [Validators.required, Validators.email]),
    //date joined will only be set to this date on registering
    dateJoined: new FormControl(new Date(), [Validators.required, dateValidator]),
    //password must be at least 8 letters and max 50 letters
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
    //admingflag is required and can only be 0 or 1
    adminFlag: new FormControl(0, [Validators.required, Validators.pattern(/^[01]$/)])
  })

  get runnerName() {return this.loginForm.get('runnerName');}
  get email() {return this.loginForm.get('email');}
  get password() {return this.loginForm.get('password');}

  ngOnInit(): void {
    let runner = this.loginManager.getRunner();
    this.loginForm.patchValue(
      {
        runnerName: runner.runnerName,
        email: runner.email,
        password: runner.password
      }
    )
  }

//check if login data was valid, if yes redirects to home page
  login() {
    let runner: Runner = this.loginForm.value as Runner;
    if (this.validateRunnerList(runner, this.runnerApiService.runners)) {
      let runnerInList = this.getRealRunner(runner)
      this.loginManager.setRunner(runnerInList);
      this.loginManager.login()
    } else {
    }
  }


//goes through all users and compares their login data
  validateRunnerList(possibleRunner: Runner, realRunnerList: Runner[]) {
    let match = this.findRunnerWithSameEmail(possibleRunner, realRunnerList);
    return this.compareRunnerData(possibleRunner, match);
  }

//compares two runner interfaces
  compareRunnerData(runner1: Runner, runner2: Runner): boolean {
    if (runner1.runnerName !== runner2.runnerName) {
      return false;
    }

    if (runner1.email !== runner2.email) {
      return false;
    }
    return runner1.password == runner2.password;
  }

  findRunnerWithSameEmail(possibleRunner:Runner, realRunnerList:Runner[]) {
    return realRunnerList.filter(runner =>runner.email === possibleRunner.email)[0];
  }

  getRealRunner(runner1:Runner){
    for (let i = 0; i < this.runnerApiService.runners.length; i++) {
      if(this.runnerApiService.runners[i].runnerName === runner1.runnerName && this.runnerApiService.runners[i].email === runner1.email && this.runnerApiService.runners[i].password === runner1.password){
         return this.runnerApiService.runners[i];
      }
    }
    return null;
  }
}

