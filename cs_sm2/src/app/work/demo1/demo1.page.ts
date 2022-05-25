import { Component, OnInit } from '@angular/core';
import { questionList } from '../../sharedData/questionList';

@Component({
  selector: 'app-demo1',
  templateUrl: './demo1.page.html',
  styleUrls: ['./demo1.page.scss'],
})
export class Demo1Page implements OnInit {
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
