import { Component, OnInit, ViewChild } from '@angular/core';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FirebaseService } from '../shared/service/firebase.service';
import { AlertService } from '../shared/service/alert.service';

import { LoadingController } from '@ionic/angular';
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
    public loadingController: LoadingController,
    private fs: FirebaseService,
    private al: AlertService,
  ) {

  }

  updateEditorField() {
    //update the question and answer datafield based on the current qType
    if (this.qType === "ba") {
      this.editorQuestion.editorInstance.setData('<p>Term:&nbsp;</p>');
      this.editorAnswer.editorInstance.setData('<p>Definition:&nbsp;</p>');
    } else if (this.qType === "mu") {
      this.editorQuestion.editorInstance.setData('<p>Question:</p><p>&nbsp;</p><p>A):</p><p>B):</p><p>C):</p><p>D):</p><p>E):</p>');
      this.editorAnswer.editorInstance.setData('<p>Correct Answer:</p><p>&nbsp;</p>');
    } else {
      this.editorQuestion.editorInstance.setData('<p>Coding Question:</p>');
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

    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();

    this.fs.addDataService("QuestionCollection", data).then((res: any) => {
      console.log(res);

      console.log("Changes saved to cloud!");
      this.al.displayMessage("Upload Success");
      loading.dismiss();
      console.log("need saving to false");
    }).catch((error) => {
      loading.dismiss();
      this.al.alertMessage('Failed to save changes, Try again! ');
      console.log("error", error);
    })
    this.updateEditorField();
    console.log(data);
  }



}
