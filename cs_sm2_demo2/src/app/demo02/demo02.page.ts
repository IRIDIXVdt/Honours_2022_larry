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
      //then initialize all the question as unanswered
      this.qList = (v as any[]);
      for (let i = 0; i < this.qList.length; i++) {
        this.qList[i].answered = false;
      }
      //then initialize index
      this.index = 0;
      this.displayAnswer = false;
      this.updateEnableDisplayAnswer();
    });
  }

  ngOnInit() {
  }

  updateEnableDisplayAnswer() {
    console.log(this.qList[this.index].qType);
    if (this.qList[this.index].qType === 'ba') {
      console.log('this is a basic type question')
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

  saveAndStore

  answer(answer: number) {
    if (this.index + 2 > this.qList.length) {
      this.sessionEnd = true;
      //end this session
      //then upload everything in this session to database
    } else {//handle the responsive
      /*
      if user is first time answering this question
        if quality is easy, store info and end this right away
        if quality is not easy, store info and repeat this three time
      or if the user is attempting this question already
        if quality is poor or repeat, repeat it once
        if quality is good or easy, check if there are repeat time left
          if no repeat time left, store info end this
      */
      if(!this.qList[this.index].answered){
        if(answer==3){//quality easy

        }else{
          this.qList[this.index];
        }
      }else{

      }

     
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
