import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../shared/service/database.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
})
export class BrowsePage implements OnInit {

  questionList;
  constructor(
    private dt: DatabaseService,
  ) {
    // this.questionList = this.dt.getQuestionData() as unknown as any[];
    // this.questionList = this.dt.getQuestionData();
    // console.log(this.dt.returnOne());
    this.getData();

  }

  ngOnInit() {

    // console.log(this.questionList.length());

  }

  async getData() {
    // this.questionList = await this.dt.getQuestionData();
    this.dt.getQuestionData()
      .then((v) => {
        console.log(v);
        this.questionList = v;
      })

  }

  testList = [
    { id: '4uSaMQFKheEg8KTbbdKt', qType: 'mu', qCourse: 'cosc304', question: '<p>Question: Given this table and the query</p><p>…><p>A): 0</p><p>B): 1</p><p>C): 2</p><p>D): 3</p>', answer: '<p>Correct Answer: &nbsp;A</p><p>&nbsp;</p>', },
    { id: 'DiqPvTb68ggoUnt8kVGE', qType: 'mu', qCourse: 'cosc304', question: '<p>Question: Given this table and the query:</p><p…><p>B): 1</p><p>C): 2</p><p>D): 3</p><p>E): 4</p>', answer: '<p>Correct Answer:</p><p>A</p>', },
    { id: 'FCyW225FZMCTjSVQDorM', qType: 'ba', qCourse: 'cosc304', question: '<p>A query in SQL has the form:</p><p>SELECT (____…><p>GROUP BY (______)</p><p>ORDER BY (______)</p>', answer: '<p>A query in SQL has the form:&nbsp;</p><p>SELECT… WHERE, GROUP BY, ORDER BY are optional</li></ol>', },
    { id: 'K40YCcyEu1aDTwZhMr65', qType: 'ba', qCourse: 'cosc304', question: '<p>Term:&nbsp;</p>', answer: '<p>Definition:&nbsp;</p>', },
    { id: 'lX6RfSkx7QvFy7jyYfx5', qType: 'ba', qCourse: 'cosc304', question: '<p>Term:&nbsp;</p>', answer: '<p>Definition:&nbsp;</p>', },

  ]

}
