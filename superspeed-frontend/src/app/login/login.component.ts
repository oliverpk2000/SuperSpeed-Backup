import {Component, Injector, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
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

  constructor(public loginManager: LoginManagementService, private contentApi: ContentApiService) {
  }

  //Login Form, (reactive form)

//form setup
  loginForm = new FormGroup({
    //database will automatically set the id
    runnerId: new FormControl(0),
    //runnername must be between 3 and 50 letters
    runnerName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    //there is already a validation for email I guess
    email: new FormControl('', [Validators.required, Validators.email]),
    //date joined will only be set to this date on registering
    dateJoined: new FormControl(new Date()),
    //password must be at least 8 letters and max 50 letters and must contain one capital letter
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
    adminFlag: new FormControl(),
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

//check if login data was valid, if yes redirects to home page
  login() {
    let runner: Runner = this.loginForm.value as Runner;

    if (this.validateRunnerList(runner, this.runnerList)) {
      let runnerInList = this.getRealRunner(runner)
      this.loginManager.setRunner(runnerInList);
      this.loginManager.login()
    } else {
    }
  }

  //Fills runnerList with the Runners in DB/InMemory
  getRunners() {
    this.contentApi.getAllRunners().subscribe((res) => {
      this.runnerList = res
    })
  }

//goes through all users and compares their login data
  validateRunnerList(possibleRunner: Runner, realRunnerList: Runner[]) {
    let match = this.findRunnerWithSameEmail(possibleRunner, realRunnerList);
    return this.compareRunnerData(possibleRunner, match);
  }

//compares two runner interfaces
  compareRunnerData(runner1: Runner, runner2: Runner): boolean {
    console.log(runner1)
    console.log(runner2)
    if (runner1.runnerName !== runner2.runnerName) {
      return false;
    }

    if (runner1.email !== runner2.email) {
      console.log("emails: " + runner1.email === runner2.email);
      return false;
    }
    console.log("passwords: " + runner1.password == runner2.password);
    console.log("passwords: " + runner1.password + ", " + runner2.password);
    return runner1.password == runner2.password;
  }

  findRunnerWithSameEmail(possibleRunner:Runner, realRunnerList:Runner[]) {
    return realRunnerList.filter(runner =>runner.email === possibleRunner.email)[0];
  }

  getRealRunner(runner1:Runner){
    for (let i = 0; i < this.runnerList.length; i++) {
      if(this.runnerList[i].runnerName === runner1.runnerName && this.runnerList[i].email === runner1.email && this.runnerList[i].password === runner1.password){
         return this.runnerList[i];
      }
    }
    return null;
  }
}
/**
//Cusom validators for Login Form
export function uniqueRunnerName(control: AbstractControl):ValidationErrors | null{
  const runnerName = control.value.trim();
  //using Injector to inject the service into the function
  const injector = Injector.create({
    providers: [{ provide: ContentApiService, useClass: ContentApiService }]
  });

  let exists:number = 0;
  injector.get(ContentApiService).getRunnerByName(runnerName).subscribe((res: number) =>{
    exists = res;
  });

  return exists===0 ? null : {invalidUserName: runnerName}
}
 */
