import { Injectable } from '@angular/core';
import { questionList } from '../data/questionList';
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
    public das: DatabaseService,
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
    this.das.getQuestionData().then(v => {
      questionList = (v as any[]);

    });

  }

  //to do: fetch question feature
  //utilize los and das, so that:
  //with a question id, it can return question data
  //if local storage contains that, then return it
  //if not, fetch from database, and return it, (at the same time storing it)
  async fetchQuestionWithId(qId: string) {
    var dataList = this.los.fetchLocalData('questionCollection') as any[];
    var targetQuestion = dataList.filter(e => e.qId = qId)[0];
    if (targetQuestion == null || targetQuestion == undefined) {
      console.log('fetch from remote', qId);
      //if we do not have it in local
      //first collect it from database
      targetQuestion = await this.das.getQuestionItemData(qId);
      dataList.push(targetQuestion);
      //then store it in local storage
      this.los.setLocalData('questionCollection', dataList);
    } else {
      console.log('local exist', qId);
    }
    return targetQuestion;
  }
}
