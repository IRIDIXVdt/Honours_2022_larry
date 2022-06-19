import { Component, OnInit } from '@angular/core';
import { threadId } from 'worker_threads';
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
  // index: number;//new logic: only display the first item
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
      // this.index = 0;
      this.displayAnswer = false;
      this.updateEnableDisplayAnswer();
    });
  }

  ngOnInit() {
  }

  updateEnableDisplayAnswer() {
    // console.log(this.qList[0].qType);
    if (this.qList.length > 0)
      if (this.qList[0].qType === 'ba') {
        // console.log('this is a basic type question')
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

  saveAndStore() {
    this.qList.shift();//remove first element
    //then store it in local storage in a specific way
  }

  answer(answer: number) {
    //handle the responsive: repeat some of the question
    /*
    if user is first time answering this question
      if quality is easy, store info and end this right away
      if quality is not easy, store info and repeat this three time
    or if the user is attempting this question already
      if quality is poor or repeat, repeat it once
      if quality is good or easy, check if there are repeat time left
        if no repeat time left, store info end this
    */
    var currentItem = this.qList.shift();//get the very first item
    if (!currentItem.answered) {
      currentItem.answered = true;//update currenItem answer
      if (answer == 3) {//quality easy
        //remove item from the list and
        //to do: store the item
      } else {
        currentItem.level = answer;//this is the level
        currentItem.repeatTime = 3;//repeat it for three times
        this.qList.splice(Math.round(this.qList.length / 2), 0, currentItem);//insert this item to the middle
      }
    } else {
      if (answer == 0 || answer == 1) {
        //don't change the repeat time
        console.log('respond poor quality, repeat question')
        this.qList.splice(Math.round(this.qList.length / 2), 0, currentItem);
      } else {
        if (currentItem.repeatTime == 1) {
          //to do: store the item
          //addition requirement: if the length gets to 0 end this session
        } else {
          console.log('respond good quality, minus repeat time by 1')
          const repeatTime = currentItem.repeatTime;
          currentItem.repeatTime = repeatTime - 1;
          this.qList.splice(Math.round(this.qList.length / 2), 0, currentItem);
        }
      }
    }

    if (this.qList.length == 0) {
      this.sessionEnd = true;
      //end this session
      //then upload everything in this session to database
    }

    // this.index++;//update current number

    this.displayAnswer = false;
    // console.log('the user answered', answer);
    this.updateEnableDisplayAnswer();

    this.qList.forEach(e => {
      console.log(e.id, 'repeat', e.repeatTime, 'level', e.level);
    });
    console.log('----------');

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
