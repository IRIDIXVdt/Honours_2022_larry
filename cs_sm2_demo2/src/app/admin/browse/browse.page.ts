import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/service/database.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
})
export class BrowsePage implements OnInit {

  questionList;
  sList;
  sessionList;
  sessionId;
  checkedQuestionList;

  constructor(
    private das: DatabaseService,
  ) {
    // this.das.getQuestionData().then((v) => { this.questionList = v; });
    this.fetchSession();
  }

  ngOnInit() { }

  async display() {
    console.log(this.questionList);
  }

  async uploadCheckedQuestion() {
    for (let i = 0; i < this.questionList.length; i++) {
      const currentItem = this.questionList[i];
      if (currentItem.isChecked) {//if isChecked feature exist or equals true
        const element = await this.das.addSessionQuestionWithId(this.sessionId, currentItem.id);
        console.log(element);
      }
    }
  }

  async fetchSessionData(){
    this.checkedQuestionList = await this.das.getSessionQuestionWithId(this.sessionId);
    console.log(this.checkedQuestionList);
  }

  async updateQuestionData() {
    console.log("update question", this.sessionId);
    const list = await this.das.filterQuestionData(this.sList.filter(
      e => e.id == this.sessionId)[0].sCode.toLowerCase());
    console.log(list);
    this.questionList = list;
    this.fetchSessionData()
  }

  fetchSession() {
    this.sList = null;
    this.das.getSessionData('All').then(v => {
      this.sList = v;
      console.log(this.sList);
      this.generateSessionList();
    });
  }

  generateSessionList() {
    const sessionIdList: string[] = this.das.getLocalUserSessionList();
    if (sessionIdList.length > 0) {
      this.sessionList = [];
      for (let i = 0; i < this.sList.length; i++) {//iterate through all the list
        if (sessionIdList.filter(e => e == this.sList[i].id).length > 0) {
          this.sessionList.push(this.sList[i]);
        }
      }
    }
  }
}
