import {Component, OnInit} from '@angular/core';
import {LoginManagementService} from "../login-management.service";
import {Runner} from "../objects/runner";
import {ActivatedRoute} from "@angular/router";
import {ContentApiService} from "../content-api.service";

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

  constructor(public loginManager: LoginManagementService, private route: ActivatedRoute, public contentApiService: ContentApiService) {
  }

  ngOnInit(): void {
    this.update()
  }


  update() {
    this.route.params.subscribe(params => {
      //getting runnerId from URL -- format /superspeed/runner/*runnerId*
      const runnerId = Number(params['runnerId']);
      //getting the runner, with this runnerId
      this.contentApiService.getrunner(runnerId).subscribe((res) => {
        this.runner = res;
        this.runnerName = this.runner.runnerName;
        this.email = this.runner.email;
        this.password = this.runner.password;
      });
    })
  }

  changeEvent() {
    this.inChange = true;
  }

  applyEvent() {
    const changedRunner = {
      runnerId: this.runner.runnerId, runnerName: this.runnerName,
      email: this.email, password: this.password, dateJoined: this.runner.dateJoined, adminFlag: this.runner.adminFlag
    }
    this.contentApiService.updaterunner(changedRunner).subscribe();
    this.inChange = false;
    this.update()
  }

}
