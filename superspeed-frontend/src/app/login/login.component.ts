import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginManagementService} from "../login-management.service";
import {Runner} from "../objects/runner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginManager: LoginManagementService) {
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
    //TODO: authentication
    let runner: Runner = this.loginForm.value as Runner;
    this.loginManager.setRunner(runner);
    this.loginManager.login()
    console.log("just imagine some authentication please");

  }
}
