import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QTypePage } from './q-type/q-type.page';
import { FirebaseService } from 'src/app/share/service/firebase.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
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

  displayModal() {
    console.log("This is modal open action");

    this.modalCtrol.create({
      component: QTypePage,
      // componentProps: {
      //   content: "https://www.desmos.com/calculator",
      // }
    }).then(modalres => {
      modalres.present();
      modalres.onDidDismiss().then(res => {
        console.log("cover modal dismiss!");
      })

    })
  }
  

}
