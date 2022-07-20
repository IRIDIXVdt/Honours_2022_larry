import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  current;
  timeEnd: number;//decides when the process is overTime
  timeStart: number;//decides the day which the system will log the progress

  constructor() { }
  grace: number = 2;
  public initializeAll() {
    this.initializeTimeStart();
    this.initializeTimeEnd();
    console.log('start', this.timeStart, 'end', this.timeEnd);
  }

  public initializeTimeStart() {
    //if it is before 12 pm to 2am in the morning, initialize it to the day before
    //initialize end time and start time
    //unless the system is overtime, do not reload this
    this.current = new Date();//initialize Date object with current time
    var compare = new Date();
    compare.setHours(0, this.grace, 0, 0);
    if (compare.getTime() > this.current.getTime()) {
      //if it is before 2 am
      this.current.setDate(this.current.getDate() - 1);
    }
    this.current.setHours(0, 0, 0, 0);//set time to 0am to current timezone
    this.timeStart = this.current.getTime();
  }

  public initializeTimeEnd() {
    //the system refreshes at tomorrow 2am
    // var date = new Date();
    this.current.setHours(0, this.grace, 0, 0);
    this.current.setDate(this.current.getDate() + 1);
    this.timeEnd = this.current.getTime();
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
