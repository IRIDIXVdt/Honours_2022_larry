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
    private als: AlertService,
  ) { }

  async addData(collection: string, data) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();

    this.fs.addDataService(collection, data).then((res: any) => {
      console.log(res);
      console.log("Changes saved to cloud!");
      this.als.displayMessage("Upload Success");
      loading.dismiss();
      // return true;
    }).catch((error) => {
      loading.dismiss();
      this.als.displayMessage('Fail to save changes. Try again!');
      console.log("error", error);
    })
    // return false;
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
          this.als.displayMessage('Fail to fetch data from database. Please try again.');
        })
    });
  }

  // newGetQuestionData() {
  //   console.log('invoke');
  //   this.fs.newGetDataService("QuestionCollection").forEach(e => {
  //     console.log(e);
  //   })
  // }

  getSessionData(code) {
    return new Promise((resolve, reject) => {//invoke method on filter type
      (code == 'All' ? this.fs.getCollection("sessionCollection")
        : this.fs.getSessionWithFilter('sessionCollection', code, 'sTime'))
        .subscribe((res) => {//retrieve data
          const receiveValue = res.map(e => {
            return {//store value from result array
              id: e.payload.doc.id,//document id
              sCode: e.payload.doc.data()['sCode'],
              sTime: e.payload.doc.data()['sTime'],
              sNumber: e.payload.doc.data()['sNumber'],
            }
          });
          resolve(receiveValue);//return value in promise
        }, (err: any) => {//catch error
          console.log(err);
          reject();//reject and display error message
          this.als.displayMessage('Fail to fetch data from database. Please try again.');
        })
    });
  }

}
