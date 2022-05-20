import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController, LoadingController, ModalController, NavParams } from '@ionic/angular';
import { Browser } from 'protractor';

@Component({
  selector: 'app-inner-browser',
  templateUrl: './inner-browser.page.html',
  styleUrls: ['./inner-browser.page.scss'],
})
export class InnerBrowserPage implements OnInit {
  browserLink: string;
  iframeUrl: any;
  constructor(
    public modalController: ModalController,
    private navParams: NavParams,
    // public firebaseService: FirebaseService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public sanitizer: DomSanitizer
  ) {
    this.browserLink = this.navParams.data.content;//fetch id from database
    // this.browserLink = "https://www.bilibili.com/video/BV1Z44y1H76g";
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.browserLink);
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
  }

}
