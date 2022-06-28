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
  constructor(
    private das: DatabaseService,
  ) {
    this.das.getQuestionData().then((v) => { this.questionList = v; });
    this.fetchSession();
  }

  ngOnInit() { }

  updateQuestionData() {
    console.log("update question");
  }

  buttonClick() {
    console.log("button onclick");
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
    console.log(this.sessionList, this.sList);
  }
}
