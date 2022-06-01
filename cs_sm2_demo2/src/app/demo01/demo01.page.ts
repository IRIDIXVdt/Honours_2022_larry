import { Component, OnInit } from '@angular/core';
import { questionList } from '../shared/data/questionList';
@Component({
  selector: 'app-demo01',
  templateUrl: './demo01.page.html',
  styleUrls: ['./demo01.page.scss'],
})
export class Demo01Page implements OnInit {

  qList = questionList;
  index: number;
  displayAnswer: boolean;
  sessionEnd: boolean;
  constructor() {
    console.log(this.qList);
    this.index = 0;
    this.displayAnswer = false;
  }

  ngOnInit() {
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
    }

  }

}
