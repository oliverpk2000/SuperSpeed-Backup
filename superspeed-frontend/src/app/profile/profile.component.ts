import {Component, OnInit} from '@angular/core';
import {LoginManagementService} from "../login-management.service";
import {Runner} from "../objects/runner";
import {ActivatedRoute} from "@angular/router";
import {SpeedrunApiService} from "../api/speedrun-api.service";
import {RunnerApiService} from "../api/runner-api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
/**Written by Tobias Sprecher*/
export class ProfileComponent implements OnInit {
  runner: Runner = {runnerId: -1, runnerName: '', email: '', dateJoined: new Date(), adminFlag: 0, password: ''};
  inChange: boolean = false;
  runnerName: string = "";
  email: string = "";
  password: string = "";

  constructor(public loginManager: LoginManagementService, private route: ActivatedRoute, public runnerApiService: RunnerApiService) {
  }

  ngOnInit(): void {
    this.update()
  }


  update() {
    this.route.params.subscribe(params => {
      //getting runnerId from URL -- format /superspeed/runner/*runnerId*
      const runnerId = Number(params['runnerId']);
      //getting the runner, with this runnerId
      this.runnerApiService.getrunner(runnerId).subscribe((res) => {
        this.runner = res;
        this.runnerName = this.runner.runnerName;
        this.email = this.runner.email;
        this.password = this.runner.password;
      });
    })
  }


  //basic validations
  changeEvent() {
    this.inChange = true;
  }

  validateName(){
    return this.runnerName.length>=3 && this.runnerName.length <=50
  }

  validateEmail(){
    return this.email.match("@");
  }

  validatePassword(){
    return this.password.length >= 8 && this.password.length<=50
  }

  validate(){
    if(this.validateName()){
      if(this.validateEmail()){
        if(this.validatePassword()){
          return true
        }
      }
    }
    return false;
  }

  //deletes the current runner
  deleteAction(){
    this.runnerApiService.deleterunner(this.runner).subscribe();
    location.reload();
  }

  //cancels the editing process
  cancelAction(){
    this.inChange = false;
  }

  //applies the changes to the current runner
  //!!!! admin flags dont work even though they are set to 1 !!!!!!!
  applyEvent() {
    const changedRunner = {
      runnerId: this.runner.runnerId, runnerName: this.runnerName,
      email: this.email, password: this.password, dateJoined: this.runner.dateJoined, adminFlag: this.runner.adminFlag
    }
    this.runnerApiService.updaterunner(changedRunner).subscribe();
    this.inChange = false;
    this.update()
  }

}
