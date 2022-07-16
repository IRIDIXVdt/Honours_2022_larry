import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  endTime: number;//decides when the process is overTime

  constructor() { }

  //if the software is open for over 24 hours, then close it
  //alternative implementation, if the software is open for ten minutes
  //save the progress.
  public overTime() {
    const date = new Date();
    return date.getTime() > this.endTime;
  }

  public initializeEndTime() {
    //the system refreshes at tomorrow 2am
    var date = new Date();
    date.setHours(0, 2, 0, 0);
    date.setDate(date.getDate() + 1);
    this.endTime = date.getTime();
    console.log(this.endTime);
  }

  public getCurrentDay() {
    const current = new Date();//initialize Date object with current time
    current.setHours(0, 0, 0, 0);//set time to 0am to current timezone
    return current.getTime();
  }

  public getNextDay(n, EF) {
    const interval = Math.round(this.timeIntervalCalculation(n, EF));
    var next = this.getCurrentDay() + interval * 86400000;//next date in millisecond
    return next;
  }

  public timeIntervalCalculation(n, EF) {
    if (n == 1) {
      return 1;
    } else if (n == 2) {
      return 6;
    } else {
      return this.timeIntervalCalculation(n - 1, EF) * EF;
    }
  }
}
