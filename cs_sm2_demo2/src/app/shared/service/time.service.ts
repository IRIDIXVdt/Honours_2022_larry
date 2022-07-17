import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  timeEnd: number;//decides when the process is overTime
  timeStart: number;//decides the day which the system will log the progress

  constructor() { }

  public initializeAll() {
    this.initializeTimeStart();
    this.initializeTimeEnd();
  }

  public initializeTimeStart() {
    //initialize end time and start time
    //unless the system is overtime, do not reload this
    const current = new Date();//initialize Date object with current time
    current.setHours(0, 0, 0, 0);//set time to 0am to current timezone
    this.timeStart = current.getTime();
  }

  public initializeTimeEnd() {
    //the system refreshes at tomorrow 2am
    var date = new Date();
    date.setHours(0, 2, 0, 0);
    date.setDate(date.getDate() + 1);
    this.timeEnd = date.getTime();
    console.log(this.timeEnd);
  }

  //if the software is overTime, reload information and restart
  //alternative implementation, if the software is open for ten minutes
  //save the progress.
  public overTime() {
    const date = new Date();//get current time
    return date.getTime() > this.timeEnd;
  }


  public getCurrentDay() {
    return this.timeStart;
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
