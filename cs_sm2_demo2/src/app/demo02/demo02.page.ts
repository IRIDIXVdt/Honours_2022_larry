import { Component, OnInit } from '@angular/core';
import { questionList } from '../shared/data/newQuestionData';
import { UserRecordData } from '../shared/data/userRecordSchema';
import { DatabaseService } from '../shared/service/database.service';
import { UserRecordService } from '../shared/service/user-record.service';

@Component({
  selector: 'app-demo02',
  templateUrl: './demo02.page.html',
  styleUrls: ['./demo02.page.scss'],
})
export class Demo02Page implements OnInit {
  // qList = questionList;
  qList: any[];
  index: number;
  displayAnswer: boolean;
  disableDisplayAnswer: boolean;
  newDisableDisplayAnswer: boolean = false;
  sessionEnd: boolean;
  userCode: string = '';
  userMulti: string = '';



  constructor(
    public urs: UserRecordService,
    public dab: DatabaseService,

  ) {
    //loadQuestionList
    dab.getQuestionData().then(v => {
      this.qList = (v as any[]);
      //then initialize index
      this.index = 0;
      this.displayAnswer = false;
      this.updateEnableDisplayAnswer();
    });
  }

  ngOnInit() {
  }
  updateEnableDisplayAnswer() {
    if (this.qList[this.index].questionType === 'basic') {
      this.disableDisplayAnswer = false;
    } else {
      this.disableDisplayAnswer = true;
    }
  }
  enableDisplay() {
    // console.log('trigger');
    this.disableDisplayAnswer = false;
  }

  check() {
    this.displayAnswer = true;
  }

  answer(answer: number) {
    if (this.index + 2 > this.qList.length) {
      this.sessionEnd = true;
    } else {
      this.index++;
      this.displayAnswer = false;
      console.log('the user answered', answer);
      this.updateEnableDisplayAnswer();
    }
    this.userCode = '';
    this.userMulti = '';

  }

  storeUserRecordData() {
    const data: UserRecordData = {
      userId: '',
      completeTime: '',
      questionid: '',
      q: 0,
      EF: 0,
      n: 0
    }
    console.log(data);
  }
}
