import { Component, OnInit, ViewChild } from '@angular/core';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic/';
// import * as ClassicEditor from '@ckeditor/ckeditor5-custom-test01/';
import * as ClassicEditor from '@ckeditor/ckeditor5-35.0.1-41p6gtbyxuvr';
import { DatabaseService } from '../../shared/service/database.service';
// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import { QuestionItem, QuestionAnswerPair } from 'src/app/shared/data/questionSchema';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  public Editor = ClassicEditor;//ckeditor component
  public modelQuestion;//tracking question field
  public modelAnswer;//trakcing answer field
  // @ViewChild('editorQuestion') editorQuestion: CKEditorComponent;
  // @ViewChild('editorAnswer') editorAnswer: CKEditorComponent;
  // @ViewChild('editorDescription') editorDescription: CKEditorComponent;
  @ViewChild('editorBody') editorBody: CKEditorComponent;

  public qType: string = 'df';//question type
  public qCourse: string = 'cosc304';//course type
  public qDes: string = '';
  // public qQAP: QuestionAnswerPair[] = [{ question: '', answer: '' }];

  public qQAP: QuestionAnswerPair[] = [
    { question: 'oneq', answer: 'onea' },
    { question: 'twoq', answer: 'twoa' }
  ];

  constructor(
    private dt: DatabaseService,
  ) {
  }

  updateEditorField() {
    //update the question and answer datafield based on the current qType
    if (this.qType === "df") {

    } else {

    }
    // if (this.qType === "ba") {
    //   this.editorQuestion.editorInstance.setData('<p>Term:&nbsp;</p>');
    //   this.editorAnswer.editorInstance.setData('<p>Definition:&nbsp;</p>');
    // } else if (this.qType === "mu") {
    //   this.editorQuestion.editorInstance.setData('<p>Question:&nbsp;</p><p>&nbsp;</p><p>A):&nbsp;</p><p>B):&nbsp;</p><p>C):&nbsp;</p><p>D):&nbsp;</p><p>E):&nbsp;</p>');
    //   this.editorAnswer.editorInstance.setData('<p>Correct Answer:&nbsp;</p><p>&nbsp;</p>');
    // } else {
    //   this.editorQuestion.editorInstance.setData('<p>Coding Question:&nbsp;</p>');
    //   this.editorAnswer.editorInstance.setData('');
    // }
    // this.editorDescription.editorInstance.setData('<p>Description:&nbsp;</p>');
  }

  ngOnInit() {
  }

  async addDataToDataBase() {
    const data: QuestionItem = {
      type: this.qType,
      background: this.editorBody.editorInstance.getData(),
      course: this.qCourse,
      des: this.qDes,
      qaPair: this.qQAP,
      choice: []
    }

    console.log("add data", data);
    // if (this.dt.addData("QuestionCollection", data)) {
    //   this.updateEditorField();
    // }

  }

  logData() {
    console.log(this.editorBody.editorInstance.getData());
  }


}
