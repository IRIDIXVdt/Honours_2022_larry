import { Injectable } from '@angular/core';
import { UserRecordData } from '../data/userRecordSchema';
import { DatabaseService } from './database.service';
import { FirebaseService } from './firebase.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserRecordService {
  //date calculation required
  constructor(
    public los: LocalStorageService,
    public fas: FirebaseService,
    public dab: DatabaseService,
  ) { }

  data: UserRecordData = {
    userId: '',
    completeTime: 0,
    questionid: '',
    q: 0,
    EF: 0,
    n: 0
  }

  storeLocalInfo(questionid, q, EF, n) {
    //we need to store two things:
    //user record, for the purpose of data collection for research
    //user term list, introduce this term to user data list with q EF n and next date
    const UID = this.los.idStatus();//fetch user id
    console.log(UID);//display user id
    const current = new Date();//initialize Date object with current time
    current.setHours(0,0,0,0);//set time to 0am to current timezone
    const collectData: UserRecordData = {
      userId: this.los.idStatus(),
      questionid: questionid,
      completeTime: current.getTime(),
      q: q,
      EF: EF,
      n: n,
    }
    //calculate the interval of time with respect to next date
    const interval = Math.round(this.timeIntervalCalculation(n, EF));
    var next = current.getTime() + interval * 86400000;//next date in millisecond
    const userInfo = {
      questionid: questionid,
      nextTime: next,
      q: q,
      EF: EF,
      n: n,
    }
    // console.log('store data', collectData);
    // console.log('get user info', userInfo);
    const test = new Date();
    test.setTime(next);
    console.log(test);
    this.los.collectUserAnswer(collectData);
    this.los.storeUserProgress(userInfo);
  }

  timeIntervalCalculation(n, EF) {
    if (n == 1) {
      return 1;
    } else if (n == 2) {
      return 6;
    } else {
      return this.timeIntervalCalculation(n - 1, EF) * EF;
    }
  }

  async uploadLocalInfo() {
    const dataArray = this.los.fetchUserQuestionData() as UserRecordData[];
    //store each item into dataCollection
    for (let i = 0; i < dataArray.length; i++) {
      await this.fas.addDataService('dataCollection', dataArray[i]);
    }
  }

  fetchQuestionFromDataBase() {
    //for now, retrieve every question from database
    var questionList = [];
    this.dab.getQuestionData().then(v => {
      questionList = (v as any[]);

    });

  }
}
