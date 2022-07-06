import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    public das: DatabaseService,
  ) {
    console.log(localStorage);
    console.log(JSON.parse(localStorage.getItem('user')));
  }

  resetLS() {//turn local storage into default
    localStorage.setItem('admin', JSON.stringify(false));
    localStorage.setItem('user', null);
    localStorage.setItem('sessionList', null);//remove session list
    localStorage.setItem('answerProgress', null);
    localStorage.setItem('answerQuestion', null);
    localStorage.setItem('allList', null);
    localStorage.setItem('userList', null);
  }

  checkAdminStatus(item) {
    if (item == "admin") {//update admin
      this.getIsAdmin().then(v => {
        localStorage.setItem('admin', JSON.stringify(v));
      })
    }
  }

  setLocalData(list, data) {
    localStorage.setItem(list, JSON.stringify(data));
  }

  fetchLocalData(data) {
    return JSON.parse(localStorage.getItem(data));
  }

  setLocalUserData(userData) {
    //to do: remove this
    // console.log(userData);
    // localStorage.setItem('session',JSON.stringify());
    localStorage.setItem('user', JSON.stringify(userData));
    this.fetchLocalUserSessionList();
    // console.log(localStorage);
  }

  fetchLocalUserSessionList() {
    //to do: remove this
    this.das.getUserCustomizeInfo('sessionList').then(v => {
      this.setLocalUserSessionList(v);
      console.log(localStorage);
    });
  }

  setLocalUserSessionList(data) {
    localStorage.setItem('sessionList', JSON.stringify(data));
  }

  getLocalUserSessionList() {
    return JSON.parse(localStorage.getItem('sessionList'));
  }

  localUserSessionListStatus() {
    return (JSON.parse(localStorage.getItem('sessionList')) as any[]).length > 0;
  }

  getIsAdmin() {//intended to be used after login, this determines if it is admin
    return new Promise((resolve, reject) => {
      if (this.userStatus())
        this.das.getAdminWithEmail(JSON.parse(localStorage.getItem('user')).email)
          .then(v => {//receive length of the corresponding querysnapshot doc
            if (v > 0) {

              localStorage.setItem('admin', JSON.stringify(true));
              console.log("User found admin", v);
              resolve(true);
            } else {

              localStorage.setItem('admin', JSON.stringify(false));
              console.log("User not admin", v);
              resolve(false);
            }
          });
      else {
        localStorage.setItem('admin', JSON.stringify(false));
        console.log("Have not logged in ");
        resolve(true);
      }
    });
  }

  userStatus() {
    // console.log(localStorage.getItem('user'));
    return JSON.parse(localStorage.getItem('user')) != null;
  }

  adminStatus() {
    if (JSON.parse(localStorage.getItem('admin')))
      return true;
    else
      return false;
  }

  emailStatus() {
    return JSON.parse(localStorage.getItem('user')).email;
  }

  idStatus() {
    return JSON.parse(localStorage.getItem('user')).uid;
  }

  collectUserAnswer(data) {
    //get the current array
    var array = this.fetchUserAnswerRecordData();
    if (array == null || array == undefined) {
      array = [];//if the array is empty, then initialize it
    }
    array.push(data);//store it in a local variable array
    //store the new array in local storage
    localStorage.setItem('answerQuestion', JSON.stringify(array));
    console.log(JSON.parse(localStorage.getItem('answerQuestion')));
  }

  fetchUserAnswerRecordData() {
    return JSON.parse(localStorage.getItem('answerQuestion'));
  }

  storeUserProgress(data) {
    //get the current array
    var array = this.fetchUserProgressData();
    if (array == null || array == undefined) {
      array = [];//if the array is empty, then initialize it
    }
    array.push(data);//store it in a local variable array
    //store the new array in local storage
    localStorage.setItem('answerProgress', JSON.stringify(array));
    console.log(JSON.parse(localStorage.getItem('answerProgress')));
  }

  fetchUserProgressData() {
    return JSON.parse(localStorage.getItem('answerProgress'));
  }

  uploadAnswerAndProgress() {
    // const userAnswerRecordArray = this.fetchUserAnswerRecordData();
    // console.log(userAnswerRecordArray);
    // this.das.uploadUserAnswer(userAnswerRecordArray);

    const userAnswerProgresArray = this.fetchUserProgressData();
    console.log(userAnswerProgresArray);
    this.das.uploadNewUserProgress(userAnswerProgresArray);
  }

  resetAnswerAndProgress() {
    localStorage.setItem('answerQuestion', null);
    localStorage.setItem('answerProgress', null);
    console.log(JSON.parse(localStorage.getItem('answerProgress')));
    console.log(JSON.parse(localStorage.getItem('answerQuestion')));
  }
}


