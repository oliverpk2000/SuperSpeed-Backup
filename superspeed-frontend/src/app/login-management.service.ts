import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Runner} from "./objects/runner";

@Injectable({
  providedIn: 'root'
})
export class LoginManagementService {
  private loginState: boolean = false;
  private runner: Runner = {runnerId:0, runnerName:'', email:'', dateJoined: new Date(), adminFlag: 0, password: ''};

  constructor(private router: Router) {
  }

  setRunner(runner: Runner){
    this.runner = runner;
  }

  getRunner(){
    return this.runner;
  }

  login() {
    this.loginState = true;
    this.router.navigate(['home'])
  }

  logout() {
    this.loginState = false;
    this.router.navigate(['login'])

  }

  checkLoginState() {
    return this.loginState;
  }
}


