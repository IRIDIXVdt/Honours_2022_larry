import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-q-type',
  templateUrl: './q-type.page.html',
  styleUrls: ['./q-type.page.scss'],
})
export class QTypePage implements OnInit {
  qtypeInstance: string;
  constructor(
    public modalController: ModalController,
    private navParams: NavParams,
    // public firebaseService: FirebaseService,
    public loadingController: LoadingController,
    public alertController: AlertController,
  ) {
    console.log('modal open');
    this.qtypeInstance = 'ba';
  }
  est() {
    console.log(this.qtypeInstance);
  }
  ngOnInit() {
  }

}
