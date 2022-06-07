import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
  ) { }

  async displayMessage(inputMessage: string) {
    const alert2 = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: inputMessage,
      buttons: ['OK']
    });
    await alert2.present();
  }

  async expectFeedback(inputMessage: string) {
    const alert2 = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: inputMessage,
      buttons: ['OK']
    });
    await alert2.present();
    const { role } = await alert2.onDidDismiss();
    return role;
  }

  async presentChoice(choiceMessage: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: choiceMessage,
      buttons: ['Cancel', 'Yes']
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role != "cancel")
      return this.startLoading();
  }

  async startLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();
    return loading;
  }

  async signInErrorAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Invalid',
      subHeader: '',
      message: message,
      buttons: ['Retry'],
    });
    await alert.present();
  }

}
