import { Component, OnInit, ViewChild } from '@angular/core';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { DatabaseService } from '../shared/service/database.service';
// import { QTypePage } from './q-type/q-type.page';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.page.html',
  styleUrls: ['./add-question.page.scss'],
})
export class AddQuestionPage implements OnInit {
  public Editor = ClassicEditor;//ckeditor component
  public modelQuestion;//tracking question field
  public modelAnswer;//trakcing answer field
  @ViewChild('editorQuestion') editorQuestion: CKEditorComponent;
  @ViewChild('editorAnswer') editorAnswer: CKEditorComponent;
  @ViewChild('editorDescription') editorDescription: CKEditorComponent;

  public qType: string = 'ba';//question type
  public qCourse: string = 'cosc304';//course type

  constructor(
    private dt: DatabaseService,
  ) { }

  updateEditorField() {
    //update the question and answer datafield based on the current qType
    if (this.qType === "ba") {
      this.editorQuestion.editorInstance.setData('<p>Term:&nbsp;</p>');
      this.editorAnswer.editorInstance.setData('<p>Definition:&nbsp;</p>');
    } else if (this.qType === "mu") {
      this.editorQuestion.editorInstance.setData('<p>Question:&nbsp;</p><p>&nbsp;</p><p>A):&nbsp;</p><p>B):&nbsp;</p><p>C):&nbsp;</p><p>D):&nbsp;</p><p>E):&nbsp;</p>');
      this.editorAnswer.editorInstance.setData('<p>Correct Answer:&nbsp;</p><p>&nbsp;</p>');
    } else {
      this.editorQuestion.editorInstance.setData('<p>Coding Question:&nbsp;</p>');
      this.editorAnswer.editorInstance.setData('');
    }
    this.editorDescription.editorInstance.setData('<p>Description:&nbsp;</p>');
  }

  ngOnInit() {
  }

  async addDataToDataBase() {
    console.log("add data");
    const data = {
      qType: this.qType,
      qCourse: this.qCourse,
      question: this.editorQuestion.editorInstance.getData(),
      answer: this.editorAnswer.editorInstance.getData(),
      description: this.editorDescription.editorInstance.getData(),
    }
    if (this.dt.addData("QuestionCollection", data)) {
      this.updateEditorField();
    }

  }



}
