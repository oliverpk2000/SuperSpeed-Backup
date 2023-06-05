import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  @Input() splits: string[] = [];

  currentSplit:number = 0;

  play:boolean = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  time: number = 0;
  interval: NodeJS.Timer;

  startTimer() {
    this.play = true;
    this.interval = setInterval(() => {
      this.time++;
    }, 1)
  }

  pauseTimer() {
    this.play = false;
    clearInterval(this.interval);
  }
}