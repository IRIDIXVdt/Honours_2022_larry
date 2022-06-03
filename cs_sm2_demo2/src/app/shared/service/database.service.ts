import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
// import { questionList } from '../data/questionList';
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
      this.al.alertMessage('Fail to save changes. Try again!');
      console.log("error", error);
    })
    return false;
  }

  getQuestionData() {
    return new Promise((resolve, reject) => {
      this.fs.getCollection("QuestionCollection")
        .subscribe((res) => {
          const receiveValue = res.map(e => {
            return {
              id: e.payload.doc.id,
              qType: e.payload.doc.data()['qType'],
              qCourse: e.payload.doc.data()['qCourse'],
              question: e.payload.doc.data()['question'],
              answer: e.payload.doc.data()['answer'],
              description: e.payload.doc.data()['description'],
            }
          });
          resolve(receiveValue);
        }, (err: any) => {
          console.log(err);
          reject();
          this.al.alertMessage('Fail to fetch data from database. Try again!');
        })
    });
  }
  
}
