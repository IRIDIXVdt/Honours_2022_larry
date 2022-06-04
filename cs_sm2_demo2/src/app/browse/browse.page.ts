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
    this.dt.getQuestionData().then((v) => { this.questionList = v; });
  }

  ngOnInit() { }

  buttonClick(){
    console.log("button onclick");
  }

}
