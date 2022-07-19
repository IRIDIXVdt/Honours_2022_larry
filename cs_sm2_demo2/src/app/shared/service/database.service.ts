import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
// import { questionList } from '../data/questionList';
import { AlertService } from './alert.service';
import { FirebaseService } from './firebase.service';
import { User } from "../data/userSchema";
import { getAdditionalUserInfo, user } from '@angular/fire/auth';
import { LocalStorageService } from './local-storage.service';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(
    public loadingController: LoadingController,
    private fas: FirebaseService,
    private als: AlertService,
  ) { }

  async addData(collection: string, data) {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
    });
    loading.present();

    this.fas.addDataService(collection, data).then((res: any) => {
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

  getQuestionItemData(id: string) {
    return new Promise((resolve, reject) => {
      this.fas.getDocument("QuestionCollection", id)
        .subscribe((res) => {
          resolve({
            id: res.id,
            qType: res.data()['qType'],
            qCourse: res.data()['qCourse'],
            question: res.data()['question'],
            answer: res.data()['answer'],
            description: res.data()['description'],
          });
        }, (err: any) => {
          console.log(err);
          reject();
          this.als.displayMessage('Fail to fetch data from database. Please try again.');
        })
    });
  }

  getQuestionData() {
    return new Promise((resolve, reject) => {
      this.fas.getCollection("QuestionCollection")
        .subscribe((res) => {
          // console.log('display res', res);
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

  filterQuestionData(course) {
    return new Promise((resolve, reject) => {
      this.fas.getDataWithFilter('QuestionCollection', 'qCourse', course)
        .subscribe((res) => {
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

  getSessionDataWithId(sid) {
    return new Promise((resolve, reject) => {//invoke method on filter type
      this.fas.getDocument('sessionCollection', sid)
        .subscribe((res) => {//retrieve data which contains an array of each question
          resolve({//store value from result array
            id: res.id,//document id
            sCode: res.data()['sCode'],
            sTime: res.data()['sTime'],
            sNumber: res.data()['sNumber'],
          })
        })
    });
  }

  getSessionData(code) {
    return new Promise((resolve, reject) => {//invoke method on filter type
      (code == 'All' ? this.fas.getCollection("sessionCollection")
        : this.fas.getSessionWithFilter('sessionCollection', code, 'sTime'))
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

  getSessionQuestionWithId(sid) {
    return new Promise((resolve, reject) => {
      this.fas.getCollectionWithOrder("sessionCollection" + '/' + sid + '/' + 'release', 'qTime')
        .subscribe((res) => {
          // console.log('display res', res);
          const receiveValue = res.docs.map(e => {
            return {
              id: e.id,
              qId: e.data()['qId'],
              qTime: e.data()['qTime'],
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

  removeSessionQuestionWithId(sid, qid) {
    return new Promise((resolve, reject) => {
      this.fas.removeDataById("sessionCollection" + '/' + sid + '/' + 'release/' + qid)
        .then((res) => {
          resolve(res);
        }, (err: any) => {
          console.log(err);
          reject();
          this.als.displayMessage('Fail to fetch data from database. Please try again.');
        })
    });
  }

  addSessionQuestionWithId(sid, qId) {
    const currentTime = (new Date()).getTime();
    const data = {
      qId: qId,
      qTime: currentTime,
    }
    this.fas.addDataService("sessionCollection" + '/' + sid + '/' + 'release', data);
  }

  addUserSession(sessionId) {
    if (sessionId != '') {//verify input not empty
      //also make sure we don't have repeating ones
      console.log('join session', sessionId);
      //get current usersession List
      var v = this.getLocalUserSessionList();
      if ((v as string[]).filter(e => e == sessionId).length > 0) {
        this.als.displayMessage('Session already selected. Please try again.');
      } else {
        (v as string[]).push(sessionId);
        //add sessionId to attribute of sessionList of user data
        this.setLocalUserSessionList(v);
        // console.log(localStorage);
        this.saveUserSessionChangesToCloud();
        // window.location.reload();

        //now calculate local list
        const allList = JSON.parse(localStorage.getItem('allList'));
        const idList = JSON.parse(localStorage.getItem('sessionList'));
        if (idList != null && idList.length > 0) {
          var sessionList = [];
          for (let i = 0; i < allList.length; i++) {//iterate through all the list
            if (idList.filter(e => e == allList[i].id).length > 0) {
              sessionList.push(allList[i]);
            }
          }
          localStorage.setItem('userList', JSON.stringify(sessionList));
        }
      }
    } else {//input empty
      this.als.displayMessage('Session not selected. Please try again.');
    }
  }

  saveUserSessionChangesToCloud() {

    const userSessionData = {
      sessionList: this.getLocalUserSessionList(),
    }
    const id = JSON.parse(localStorage.getItem('user')).uid;
    console.log('add session to user', id, userSessionData);
    return this.fas.getUser(id).update(userSessionData);
  }

  getUserCustomizeInfo(info) {
    return new Promise((resolve, reject) => {
      this.fas.getDocument('users', JSON.parse(localStorage.getItem('user')).uid)
        .subscribe(v => {
          console.log('user session Id list with Id', JSON.parse(localStorage.getItem('user')).uid, v.data()[info]);
          resolve(v.data()[info]);
        });
    });

  }

  getAdminWithEmail(email) {
    return new Promise((resolve, reject) => {
      this.fas.getCollectionFilter("adminUsers", 'email', email)
        .subscribe(res => resolve(res.docs.length)), (err: any) => {//catch error
          console.log(err);
          reject();//reject and display error message
          this.als.displayMessage('Fail to fetch data from database. Please try again.');
        }
    });
  }


  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  setUserData(user) {
    const userData: User = {
      email: user.email,
      emailVerified: user.emailVerified,
    }
    console.log('set user', user, userData);
    return this.fas.getUser(user.uid).set(userData, {
      merge: true
      //we want to update only specific attributes
      //but we don't want the software to crash if such object doesn't exist in the first place
    })
  }

  setLocalUserSessionList(data) {
    localStorage.setItem('sessionList', JSON.stringify(data));
  }

  getLocalUserSessionList() {
    return JSON.parse(localStorage.getItem('sessionList'));
  }

  async uploadUserAnswer(userList: any[]) {
    try {
      for (let i = 0; i < userList.length; i++) {
        const result = await this.fas.addDataService('userAnswerRecord', userList[i]);
        // console.log(result);
      }
    } catch (e) {
      console.error(e);
      //if the upload failed, return false
      //so the system do not clean up local data after this action
      //a possible re-upload may also be implemented here
    }

  }

  async uploadNewUserProgress(userList: any[]) {
    const userId = JSON.parse(localStorage.getItem('user')).uid;
    //insert all the userlist information into a colleciton in user
    try {
      for (let i = 0; i < userList.length; i++) {
        const result = await this.fas.addDataService('users' + '/' + userId + '/' + 'answerList', userList[i]);
        // console.log(result);

      }
    } catch (e) {
      console.error(e);
    }
  }

  async fetchUserPreviousProgress() {
    const userId = JSON.parse(localStorage.getItem('user')).uid;
    return new Promise((resolve, reject) => {
      this.fas.getProgressCollection(userId)
        .subscribe((res) => {
          const receiveValue = res.docs.map(e => {
            return {
              id: e.id,//document id
              EF: e.data()['EF'],
              n: e.data()['n'],
              nextTime: e.data()['nextTime'],
              q: e.data()['q'],
              qId: e.data()['questionid'],
            }
          });
          // console.log("Previous User Progress Display", receiveValue);
          resolve(receiveValue);//return value in promise
        }, (err: any) => {//catch error
          console.log(err);
          reject();//reject and display error message
          // this.als.displayMessage('Fail to fetch data from database. Please try again.');
        })
    });
  }

}
