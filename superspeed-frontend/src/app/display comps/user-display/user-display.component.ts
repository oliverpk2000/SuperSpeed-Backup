import {Component, Input, OnInit} from '@angular/core';
import {Runner} from "../../objects/runner";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {dateValidator} from "../../customValidators";
import {RunnerApiService} from "../../api/runner-api.service";

@Component({
  selector: 'app-user-display',
  templateUrl: './user-display.component.html',
  styleUrls: ['./user-display.component.css']
})

/** written by Tobias Sprecher */
export class UserDisplayComponent implements OnInit {
  @Input() runner:Runner = {runnerId: 0, runnerName: '', email: '', password: '', dateJoined:new Date(), adminFlag: 0}
  runnerForm:FormGroup;

  get runnerName() {return this.runnerForm.get('runnerName');}
  get email() {return this.runnerForm.get('email');}
  get password() {return this.runnerForm.get('password');}
  get adminFlag() {return this.runnerForm.get('adminFlag');}
  get dateJoined() {return this.runnerForm.get('dateJoined');}

  editing:boolean = false;

  constructor(public runnerApiService:RunnerApiService) { }

  ngOnInit(): void {

    this.runnerForm = new FormGroup({
      //database will automatically set the id, so I don't think there is any need to be able to change it, primary keys should never change anyway
      runnerId: new FormControl(this.runner.runnerId),
      //runnername must be between 3 and 50 letters
      runnerName: new FormControl(this.runner.runnerName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      //there is already a validation for email I guess
      email: new FormControl(this.runner.email, [Validators.required, Validators.email]),
      //date joined will only be set to this date on registering
      dateJoined: new FormControl(this.runner.dateJoined, [Validators.required, dateValidator]),
      //password must be at least 8 letters and max 50 letters
      password: new FormControl(this.runner.password, [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
      //admingflag is required and can only be 0 or 1
      adminFlag: new FormControl(this.runner.adminFlag, [Validators.required, Validators.pattern(/^[01]$/)])
    })
  }

  editEvent(){
    this.editing = true;
  }

  submitChanges(){
    this.runner = this.runnerForm.value as Runner;
    this.runnerApiService.updaterunner(this.runner).subscribe();
    this.editing = false;
  }

  cancelAction(){
    this.runnerForm.reset();
    this.editing = false;
  }

  deleteEvent(){
    this.runnerApiService.deleterunner(this.runner).subscribe();
  }
}
