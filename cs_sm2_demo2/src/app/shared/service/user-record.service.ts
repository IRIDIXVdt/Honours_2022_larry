import { Injectable } from '@angular/core';
import { UserRecordData } from '../data/userRecordSchema';
import { DatabaseService } from './database.service';
import { FirebaseService } from './firebase.service';
import { LocalStorageService } from './local-storage.service';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class UserRecordService {
  //date calculation required
  constructor(
    public los: LocalStorageService,
    public fas: FirebaseService,
    public dab: DatabaseService,
    public tms: TimeService,
  ) { }

  data: UserRecordData = {
    userId: '',
    completeTime: 0,
    questionid: '',
    q: 0,
    EF: 0,
    n: 0
  }

  storeLocalInfo(item) {
    //we need to store two things:
    //user record, for the purpose of data collection for research
    //user term list, introduce this term to user data list with q EF n and next date
    const UID = this.los.idStatus();//fetch user id
    // console.log(UID);//display user id

    const currentN = item.n + 1;
    const currentEF = item.EF;
    const collectData: UserRecordData = {
      userId: this.los.idStatus(),
      questionid: item.qId,
      completeTime: this.tms.getCurrentDay(),
      q: item.q,
      EF: currentEF,
      n: currentN,
    }
    //calculate the interval of time with respect to next date

    const userInfo = {
      questionid: item.qId,
      nextTime: this.tms.getNextDay(currentN, currentEF),
      q: item.q,
      EF: currentEF,
      n: currentN,
    }
    this.los.collectUserAnswer(collectData);
    this.los.storeUserProgress(userInfo);
  }

  async uploadLocalInfo() {
    const dataArray = this.los.fetchUserAnswerRecordData() as UserRecordData[];
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
