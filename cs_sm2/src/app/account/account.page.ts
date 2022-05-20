import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { InnerBrowserPage } from '../inner-browser/inner-browser.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    public alertController: AlertController,
    private modalCtrol: ModalController,
    public loadingController: LoadingController,
    ) { }

  ngOnInit() {
  }

  displayModal() {
    console.log("This is modal open action");

    this.modalCtrol.create({
      component: InnerBrowserPage,
      componentProps: {
        content: "https://www.desmos.com/calculator",
      }
    }).then(modalres => {
      modalres.present();
      modalres.onDidDismiss().then(res => {
        console.log("cover modal dismiss!");
      })

    })
  }

}
