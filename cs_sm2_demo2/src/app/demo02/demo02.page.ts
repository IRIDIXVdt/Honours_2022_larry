import { Component, OnInit } from '@angular/core';
import { threadId } from 'worker_threads';
import { questionList } from '../shared/data/newQuestionData';
import { UserRecordData } from '../shared/data/userRecordSchema';
import { DatabaseService } from '../shared/service/database.service';
import { LocalStorageService } from '../shared/service/local-storage.service';
import { UserRecordService } from '../shared/service/user-record.service';

@Component({
  selector: 'app-demo02',
  templateUrl: './demo02.page.html',
  styleUrls: ['./demo02.page.scss'],
})
export class Demo02Page implements OnInit {
  // qList = questionList;
  qList: any[];//contains the list of all questions a user would answer today
  // index: number;//new logic: only display the first item
  displayAnswer: boolean;
  // disableDisplayAnswer: boolean;
  sessionEnd: boolean;
  userCode: string = '';
  userMulti: string = '';

  constructor(
    public urs: UserRecordService,
    public dab: DatabaseService,
    public los: LocalStorageService,
  ) {
    this.fetchFromRemoteDatabase();
  }
  ngOnInit() { }

  async fetchFromRemoteDatabase() {

    //then initialize all the question as unanswered
    const v = await this.dab.getQuestionData();
    this.qList = v as any[];
    for (let i = 0; i < this.qList.length; i++) {
      this.qList[i].answered = false;
    }
    console.log(this.qList);
    const previousList = await this.dab.fetchUserPreviousProgress();
    if (previousList != null || previousList != undefined) {
     console.log('true') 
    }
    this.updateEnableDisplayAnswer();


  }

  check() {//invoked in front end page to reveal the button
    this.displayAnswer = true;
  }

  updateEnableDisplayAnswer() {
    this.displayAnswer = false;
    // console.log(this.qList[0].qType);
    // if (this.qList.length > 0)//otherwise session ends
    //   if (this.qList[0].qType === 'ba') {
    //     // console.log('this is a basic type question')
    //     this.disableDisplayAnswer = false;
    //   } else {
    //     this.disableDisplayAnswer = true;
    //   }
  }

  /*
  handle the responsive with user answer: repeat some of the question and store the others

  if user is first time answering this question
    if quality is easy, store info and end this right away
    if quality is not easy, store info and repeat this three time
  or if the user is attempting this question already
    if quality is poor or repeat, repeat it once
    if quality is good or easy, check if there are repeat time left
      if no repeat time left, store info end this
  */
  answer(answer: number) {
    var currentItem = this.qList.shift();//pop the very first item of the list
    if (!currentItem.answered) {
      currentItem.answered = true;//update currenItem answer
      if (answer == 3) {//quality easy
        //remove item from the list and
        //store the item in local storage
        this.urs.storeLocalInfo(currentItem.id, 3, 2.5, 1);
      } else {
        currentItem.level = answer;//this is the level
        currentItem.repeatTime = 3;//repeat it for three times
        this.insertItem(currentItem);
      }
    } else {
      if (answer == 0 || answer == 1) {
        //don't change the repeat time
        // console.log('respond poor quality, repeat question')
        this.insertItem(currentItem);
      } else {
        if (currentItem.repeatTime == 1) {
          //store the item in local storage
          this.urs.storeLocalInfo(currentItem.id, currentItem.level, 2.5, 1);
        } else {
          // console.log('respond good quality, minus repeat time by 1')
          const repeatTime = currentItem.repeatTime;
          currentItem.repeatTime = repeatTime - 1;
          this.insertItem(currentItem);
        }
      }
    }
    //addition requirement: if the length gets to 0 end this session
    if (this.qList.length == 0) {//end this session
      this.sessionEnd = true;
      //todo: upload everything in this session to database
      // this.urs.uploadLocalInfo();
      this.los.uploadAnswerAndProgress();
    }
    this.updateEnableDisplayAnswer();
    this.qList.forEach(e => {//display all the items in the qList
      console.log(e.id, 'repeat', e.repeatTime, 'level', e.level);
    });
    console.log('----------');
    //reset input space
    this.userCode = '';
    this.userMulti = '';
  }

  /*
  insert the current item into the list

  based on the length of the list
  if length greater than 20, insert item into 1/4
  if length greater than 10, insert item into 1/2
  otherwise, insert item into end
  */
  insertItem(item) {
    if (this.qList.length > 20)
      this.qList.splice(Math.round(this.qList.length / 4), 0, item);
    else if (this.qList.length > 10)
      this.qList.splice(Math.round(this.qList.length / 2), 0, item);
    else
      this.qList.splice(this.qList.length, 0, item);
  }

  // storeUserRecordData() {

  // }
}
