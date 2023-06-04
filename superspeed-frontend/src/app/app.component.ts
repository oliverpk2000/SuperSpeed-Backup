import {Component, OnInit} from '@angular/core';
import {LoginManagementService} from "./login-management.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  constructor(public loginManager:LoginManagementService) {
  }

  title = 'superspeed-frontend';
  //does not work yet

  profileLink:string = "http://localhost:4200/profile/"+this.loginManager.getRunner().runnerId

  ngDoCheck():void{
    const runnerId = this.loginManager.getRunner()?.runnerId;
    this.profileLink = "http://localhost:4200/profile/"+runnerId;
  }

  ngOnInit(): void {
    const runnerId = this.loginManager.getRunner()?.runnerId;
    this.profileLink = "http://localhost:4200/profile/"+runnerId;
  }
}
