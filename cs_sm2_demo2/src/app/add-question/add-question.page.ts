import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { FirebaseService } from '../shared/service/firebase.service';
// import { QTypePage } from './q-type/q-type.page';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.page.html',
  styleUrls: ['./add-question.page.scss'],
})
export class AddQuestionPage implements OnInit {
  public Editor = ClassicEditor;
  constructor(
    public alertController: AlertController,
    private modalCtrol: ModalController,
    public loadingController: LoadingController,
    private fs: FirebaseService
  ) {

  }

  ngOnInit() {
  }

  addDataToDataBase(){
    console.log("add data");
    const data={
      first:"name",
      star:2,
      thestThird:"thrid"
    }
    this.fs.addDataService("NewCollection", data);
  }


}
