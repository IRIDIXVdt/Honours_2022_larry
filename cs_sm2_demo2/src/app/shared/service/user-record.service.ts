import { Injectable } from '@angular/core';
import { UserRecordData } from '../data/userRecordSchema';
import { FirebaseService } from './firebase.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserRecordService {

  constructor(
    public los: LocalStorageService,
    public fas: FirebaseService,
  ) { }

  data: UserRecordData = {
    userId: '',
    completeTime: '',
    questionid: '',
    q: 0,
    EF: 0,
    n: 0
  }

  storeLocalInfo(completeTime, questionid, q, EF, n) {
    const UID = this.los.idStatus();//fetch user id
    console.log(UID);
    const data: UserRecordData = {
      userId: this.los.idStatus(),
      completeTime: completeTime,
      questionid: questionid,
      q: q,
      EF: EF,
      n: n,
    }
    this.los.storeUserQuestionData(data);
  }

  async uploadLocalInfo(){
    const dataArray = this.los.fetchUserQuestionData() as UserRecordData[];
    //store each item into dataCollection
    for(let i = 0; i<dataArray.length; i++){
      await this.fas.addDataService('dataCollection',dataArray[i]);
    }
  }
}
