import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  current;
  timeEnd: number;//decides when the process is overTime
  timeStart: number;//decides the day which the system will log the progress

  //to do: if overtime reset everything

  //store start and end time
  //upon initialization, check if previous end time exist
  //if so check if it is over time
  //if over time: then upload previous progress. reset everything. 
  //if not: do nothing

  constructor(
    public los: LocalStorageService,
  ) { }
  grace: number = 2;
  public initializeAll() {
    // console.log((new Date()).getTime());
    console.log(new Date());
    this.initializeTimeStart();
    this.initializeTimeEnd();
    console.log('start', this.timeStart, 'end', this.timeEnd);
    const updateRequired: boolean = this.overTime();
    const time = {
      timeStart: this.timeStart,
      timeEnd: this.timeEnd,
    }
    this.los.setLocalData('time', time);
    return updateRequired;
  }

  public initializeTimeStart() {
    //if it is before 12 pm to 2am in the morning, initialize it to the day before
    //initialize end time and start time
    //unless the system is overtime, do not reload this
    this.current = new Date();//initialize Date object with current time
    var compare = new Date();
    compare.setHours(this.grace, 0, 0, 0);

    // console.log(compare.getTime(), this.current.getTime());
    if (compare.getTime() > this.current.getTime()) {
      //if it is before 2 am
      this.current.setDate(this.current.getDate() - 1);
    }
    this.current.setHours(this.grace, 0, 0, 0);//set time to 0am to current timezone
    this.timeStart = this.current.getTime();
    console.log(this.current);
  }

  public initializeTimeEnd() {
    //the system refreshes at tomorrow 2am
    // var date = new Date();
    this.current.setHours(this.grace, 0, 0, 0);
    this.current.setDate(this.current.getDate() + 1);
    this.timeEnd = this.current.getTime();
    console.log(this.current);
  }

  //if the software is overTime, reload information and restart
  //alternative implementation, if the software is open for ten minutes
  //save the progress.
  public overTime() {
    const time = this.los.fetchLocalData('time');
    if (time != null && time != undefined) {
      if (this.timeStart > time.timeStart) {
        //this means it is over time, we need to reset system
        return true;
      }
    }
    return false;
  }

  public getCurrentDay() {
    return this.timeStart;
  }

  public getNextDay(n, EF) {
    const interval = Math.round(this.timeIntervalCalculation(n, EF));
    // var next = this.getCurrentDay() + interval * 86400000;//next date in millisecond
    var next = this.timeEnd + (interval - 1) * 86400000;
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
