import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  @Input() splits: string[] = [];

  currentSplit: number = 0;

  splitEndTimes:number[] = [];

  play: boolean = false;

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
    clearInterval(this.interval);
  }

  next() {
    this.splitEndTimes.push(this.time);
    this.currentSplit++;
    if(this.currentSplit >= this.splits.length){
      this.pauseTimer();
    }

  }
}
