import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertService } from './alert.service';
import { FirebaseService } from './firebase.service';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(
    public loadingController: LoadingController,
    private fs: FirebaseService,
    private al: AlertService,
  ) { }

  async addData(collection: string, data) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();

    this.fs.addDataService(collection, data).then((res: any) => {
      console.log(res);
      console.log("Changes saved to cloud!");
      this.al.displayMessage("Upload Success");
      loading.dismiss();
      console.log("need saving to false");
      return true;
    }).catch((error) => {
      loading.dismiss();
      this.al.alertMessage('Failed to save changes, Try again! ');
      console.log("error", error);
    })
    return false;
  }
}
