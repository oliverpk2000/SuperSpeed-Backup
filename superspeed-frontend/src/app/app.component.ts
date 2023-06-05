import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LoginManagementService} from "./login-management.service";
import {Runner} from "./objects/runner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  user: Runner = this.loginManager.getRunner();

  constructor(public loginManager: LoginManagementService) {
  }

  title = 'superspeed-frontend';
  login = "/login";
  stopwatch = "/stopwatch";
  //does not work yet

  profileLink: string = "/profile/" + this.loginManager.getRunner().runnerId

  ngDoCheck(): void {
    const runnerId = this.loginManager.getRunner()?.runnerId;
    this.profileLink = "/profile/" + runnerId;
  }

  ngOnInit(): void {
    console.log("app component (user): ", this.user);
    const runnerId = this.user.runnerId;
    this.profileLink = "http://localhost:4200/profile/" + runnerId;
    console.log("app component (profilelink): ", this.profileLink);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("app component (onchanges) user: ", this.user);
    this.user = this.loginManager.getRunner();
  }

  navigateToHome() {
    this.ngOnInit();
    console.log(this.loginManager.getGuestState())
    console.log("app component: ", this.loginManager.getRunner());
    this.loginManager.login();
  }
}
