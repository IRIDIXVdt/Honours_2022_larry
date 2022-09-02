import { Component, OnInit, ViewChild } from '@angular/core';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic/';
// import * as ClassicEditor from '@ckeditor/ckeditor5-custom-test01/';
import * as ClassicEditor from '@ckeditor/ckeditor5-35.0.1-41p6gtbyxuvr';
import { DatabaseService } from '../../shared/service/database.service';
// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import { QuestionItem, QuestionAnswerPair, WrongAnswer } from 'src/app/shared/data/questionSchema';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  public Editor = ClassicEditor;//ckeditor component
  public modelQuestion;//tracking question field
  public modelAnswer;//trakcing answer field

  @ViewChild('editorBody') editorBody: CKEditorComponent;

  public qType: string = 'df';//question type
  public qCourse: string = 'cosc304';//course type
  public qDes: string = '';
  public qQAP: QuestionAnswerPair[] = [{ question: '', answer: '' }];
  public qWA: WrongAnswer[] = [];
  constructor(private dt: DatabaseService) { }

  updateEditorField() {
    //update the question and answer datafield based on the current qType
    if (this.qType === "df") {
      this.qWA = [];
    } else {
      this.qWA = [{ content: 'one' }, { content: 'two' }];
    }
    this.qQAP = [{ question: "new question", answer: "new answer" }];
  }

  qaAdd() {
    if (this.qType === 'df') {//only definition questions can have multiple qa pairs
      const data: QuestionAnswerPair = { question: "", answer: "" };
      this.qQAP.push(data);
    }
  }

  qaRemove() {
    if (this.qQAP.length > 1 && this.qType === 'df') {//never remove the last item
      this.qQAP.pop();
    }
  }

  waAdd() {
    if (this.qType === 'mu') {
      const data: WrongAnswer = { content: 'wrong answer' };
      console.log("waAdd")
      this.qWA.push(data);
    }
  }

  waRemove() {
    if (this.qWA.length > 1 && this.qType === 'mu') {
      this.qWA.pop()
    }
  }

  async addDataToDataBase() {
    const data: QuestionItem = {
      type: this.qType,
      background: this.editorBody.editorInstance.getData(),
      course: this.qCourse,
      des: this.qDes,
      qaPair: this.qQAP,
      wrongAnswer: this.qWA,
    }

    // console.log("add data", data);
    const uploadSuccess = await this.dt.addData("QuestionCollection", data);
    if (uploadSuccess){
      this.updateEditorField();
      this.qDes="";
      this.editorBody.editorInstance.setData("");
    }
      

  }

  logData() {
    const data: QuestionItem = {
      type: this.qType,
      background: this.editorBody.editorInstance.getData(),
      course: this.qCourse,
      des: this.qDes,
      qaPair: this.qQAP,
      wrongAnswer: this.qWA,
    }
    console.log(data);
  }

  ngOnInit() { }

}
