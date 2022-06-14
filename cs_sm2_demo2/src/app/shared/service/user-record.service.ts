import { Injectable } from '@angular/core';
import { UserRecordData } from '../data/userRecordSchema';

@Injectable({
  providedIn: 'root'
})
export class UserRecordService {

  constructor() { }

  data: UserRecordData = {
    userId: '',
    completeTime: '',
    questionid: '',
    q: 0,
    EF: 0,
    n: 0
  }
}
