import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {Runner} from "./objects/runner";

@Injectable({
  providedIn: 'root'
})
export class LoginManagementService {
  private loginState: boolean = false;
  private runner: Runner = {runnerId:-1, runnerName:'guest', email:'', dateJoined: new Date(), adminFlag: 0, password: ''};
  private guestState: boolean = true;

  constructor(private router: Router) {
  }

  setRunner(runner: Runner){
    this.runner = runner;
  }

  getRunner(){
    return this.runner;
  }

  login() {
    this.setGuestState(false);
    this.loginState = true;
    this.router.navigate(['home'])
  }

  logout() {
    this.setGuestState(false);
    this.loginState = false;
    this.router.navigate(['login'])

  }

  checkLoginState() {
    return this.loginState;
  }

  setGuestState(state: boolean){
    this.guestState = state;
  }
  loginAsGuest(){
    this.setGuestState(true);
    this.router.navigate(['home'])
  }
  getGuestState(){
    return this.guestState;
  }
}


