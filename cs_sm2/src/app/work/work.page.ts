import { Component, OnInit } from '@angular/core';
import { questionList } from '../sharedData/questionList';
@Component({
  selector: 'app-work',
  templateUrl: './work.page.html',
  styleUrls: ['./work.page.scss'],
})
export class WorkPage implements OnInit {
  questionContent = questionList;
  currentString: string;
  constructor() {
    console.log(this.questionContent);
    this.assignCurrentString();
  }

  assignCurrentString() {
    const termList = this.questionContent[0].term;
    const questionList = this.questionContent[0].answer;
    this.currentString = "";
    for (let i = 0; i < termList.length; i++) {
      this.currentString += termList[i];
      if (questionList[i] != null)
        this.currentString += questionList[i];
    }
    console.log(this.currentString);
  }

  toggle() {

  }

  ngOnInit() {
  }

}
