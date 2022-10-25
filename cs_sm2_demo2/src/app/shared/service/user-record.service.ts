import { Injectable } from '@angular/core';
import { UserRecordData } from '../data/userRecordSchema';
import { AlertService } from './alert.service';
import { DatabaseService } from './database.service';
import { LocalStorageService } from './local-storage.service';
import { TimeService } from './time.service';

@Injectable({
  providedIn: 'root'
})
export class UserRecordService {
  //date calculation required
  constructor(
    public los: LocalStorageService,
    public das: DatabaseService,
    public tms: TimeService,
    public als: AlertService,
  ) { }

  dailyLimitUpdate(limit: number) {
    this.los.setLocalData('dailyLimit', limit);
    this.das.saveDailyLimitChangesToCloud(limit);
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
    //store data for analysis
    this.los.addDataToLocalArray('answerQuestion', collectData);

    const userInfo = {
      questionid: item.qId,
      //calculate the interval of time with respect to next date
      nextTime: this.tms.getNextDay(currentN, currentEF),
      q: item.q,
      EF: currentEF,
      n: currentN,
      docId: item.docId,
    }
    //store data for user progress
    this.los.addDataToLocalArray('answerProgress', userInfo);
  }

  async uploadAnswerAndProgress() {
    const loading = await this.als.startLoading();
    console.log('upload Answer And Progress');
    const collectData = await this.uploadCollectData();
    const userData = await this.uploadUserProgress();
    loading.dismiss();
  }

  async uploadCollectData() {
    //upload answer progress, then simply remove local data
    const collectData = this.los.fetchLocalData('answerQuestion') as any[];
    if (collectData != undefined && collectData != null) {
      //upload answer progress
      const uploadSuccess = await this.das.uploadUserAnswer(collectData);
      //if upload success, then remove local
      if (uploadSuccess)
        this.los.setLocalData('answerQuestion', null);
      console.log(collectData);
    }
  }

  async uploadUserProgress() {
    const userId = this.los.fetchLocalData('user').uid;
    //depending on whether progress contains docId, update or add data to user document
    const userData = this.los.fetchLocalData('answerProgress');
    if (userData != undefined && userData != null) {
      //upload user progress
      const uploadSuccess = await this.das.uploadNewUserProgress(userId, userData);
      if (uploadSuccess)
        this.los.setLocalData('answerProgress', null);
      console.log(userData);
    }
  }

  //fetch question feature
  //utilize los and das, so that:
  //with a question id, it can return question data
  //if local storage contains that, then return it
  //if not, fetch from database, and return it, (at the same time storing it)
  async fetchQuestionWithId(qId: string) {
    var dataList = await this.los.fetchLocalData('questionCollection') as any[];
    if (dataList == null || dataList == undefined) {
      dataList = [];
    }
    var targetQuestion = dataList.filter(e => e.id == qId)[0];
    if (targetQuestion == null || targetQuestion == undefined) {
      console.log(qId, 'fetch from remote');
      //if we do not have it in local
      //first collect it from database
      targetQuestion = await this.das.getQuestionItemData(qId);
      dataList.push(targetQuestion);
      //then store it in local storage
      this.los.setLocalData('questionCollection', dataList);
    } else {
      console.log(qId, 'local exist');
    }
    // console.log(targetQuestion);
    console.log('fetch question with id', targetQuestion);
    //to do: update question so that it can process dynamic changes
    if (targetQuestion.type == "df") {
      targetQuestion.qaPair.sort(() => .5 - Math.random());//shuffle
    } else if (targetQuestion.type == "mu") {
      targetQuestion.wrongAnswer.push({ content: targetQuestion.qaPair[0].answer });
      targetQuestion.wrongAnswer.sort(() => .5 - Math.random());//shuffle
    }

    return targetQuestion;
  }
}
