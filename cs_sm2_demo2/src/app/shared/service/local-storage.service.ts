import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    // public das: DatabaseService,
  ) {
    console.log(localStorage);
    console.log(JSON.parse(localStorage.getItem('user')));
  }

  questionRemove() {
    localStorage.setItem('questionCollection', null);
  }

  resetLS() {//turn local storage into default
    localStorage.setItem('admin', JSON.stringify(false));
    localStorage.setItem('user', null);
    localStorage.setItem('sessionList', JSON.stringify([]));//remove session list
    localStorage.setItem('answerProgress', null);
    localStorage.setItem('answerQuestion', null);
    localStorage.setItem('allList', null);
    localStorage.setItem('userList', null);
    localStorage.setItem('previousProgress', null);
    localStorage.setItem('qList', null);
    localStorage.setItem('time', null);
    localStorage.setItem('dailyLimit', null);
  }

  setLocalData(list, data) {
    localStorage.setItem(list, JSON.stringify(data));
  }

  fetchLocalData(data) {
    return JSON.parse(localStorage.getItem(data));
  }

  addDataToLocalArray(array: string, item) {
    var target = this.fetchLocalData(array);
    //if the array is empty, then initialize it
    if (target == null || target == undefined)
      target = [];
    //add item to list
    target.push(item);
    //store the new array in local storage
    this.setLocalData(array, target);
  }

  // setLocalUserData(userData) {
  //   //remove this
  //   // console.log(userData);
  //   // localStorage.setItem('session',JSON.stringify());
  //   localStorage.setItem('user', JSON.stringify(userData));
  //   this.fetchLocalUserSessionList();
  //   // console.log(localStorage);
  // }

  // fetchLocalUserSessionList() {
  //   //remove this
  //   this.das.getUserCustomizeInfo('sessionList').then(v => {
  //     this.setLocalUserSessionList(v);
  //     console.log(localStorage);
  //   });
  // }

  setLocalUserSessionList(data) {
    localStorage.setItem('sessionList', JSON.stringify(data));
  }

  getLocalUserSessionList() {
    const returnV = JSON.parse(localStorage.getItem('sessionList'));
    if (returnV == undefined || returnV == null) {
      return [];
    } else {
      return JSON.parse(localStorage.getItem('sessionList'));
    }
  }

  localUserSessionListStatus() {
    return (JSON.parse(localStorage.getItem('sessionList')) as any[]).length > 0;
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

  resetAnswerAndProgress() {
    localStorage.setItem('answerQuestion', null);
    localStorage.setItem('answerProgress', null);
    localStorage.setItem('qList', null);
    // console.log(JSON.parse(localStorage.getItem('answerProgress')));
    // console.log(JSON.parse(localStorage.getItem('answerQuestion')));
  }

}


