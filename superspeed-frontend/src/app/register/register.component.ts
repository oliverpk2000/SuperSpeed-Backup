import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {dateValidator} from "../customValidators";
import {RunnerApiService} from "../api/runner-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public router:Router, public runnerApiService:RunnerApiService) {
  }

  registerForm = new FormGroup({
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

  get runnerName() {return this.registerForm.get('runnerName');}
  get email() {return this.registerForm.get('email');}
  get password() {return this.registerForm.get('password');}

  ngOnInit(): void {}


  createRunner(){
    let newRunner = {runnerId: 0, runnerName: this.registerForm.get('runnerName').value, email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value, dateJoined: new Date(), adminFlag: 0}
    this.runnerApiService.postrunner(newRunner).subscribe()
    this.router.navigate(['/login'])
  }
}

