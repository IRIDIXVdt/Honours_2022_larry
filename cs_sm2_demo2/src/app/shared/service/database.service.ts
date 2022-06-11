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
          console.log('display res', res);
          const receiveValue = res.docs.map(e => {
            return {
              id: e.id,
              qType: e.data()['qType'],
              qCourse: e.data()['qCourse'],
              question: e.data()['question'],
              answer: e.data()['answer'],
              description: e.data()['description'],
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

  getSessionData(code) {
    return new Promise((resolve, reject) => {//invoke method on filter type
      (code == 'All' ? this.fs.getCollection("sessionCollection")
        : this.fs.getSessionWithFilter('sessionCollection', code, 'sTime'))
        .subscribe((res) => {//retrieve data which contains an array of each question
          const receiveValue = res.docs.map(e => {//value 
            return {//store value from result array
              id: e.id,//document id
              sCode: e.data()['sCode'],
              sTime: e.data()['sTime'],
              sNumber: e.data()['sNumber'],
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

  getUserData(userId) {
    //not working
    return new Promise((resolve, reject) => {
      //retrieve data use get()
      this.fs.getDocument('users', userId).subscribe(
        res => {
          const result = {
            email: res.data()['image'],
          }
        });
    });
  }

}
