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


  login:string = "/login";
  stopwatch:string = "/stopwatch";
  profileLink: string = "/profile/" + this.loginManager.getRunner().runnerId
  users:string = "/users";

  ngDoCheck(): void {
    const runnerId = this.loginManager.getRunner()?.runnerId;
    this.profileLink = "/profile/" + runnerId;
  }

  ngOnInit(): void {
    const runnerId = this.user.runnerId;
    this.profileLink = "http://localhost:4200/profile/" + runnerId;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.user = this.loginManager.getRunner();
  }

  navigateToHome() {
    this.ngOnInit();
    this.loginManager.login();
  }
}
