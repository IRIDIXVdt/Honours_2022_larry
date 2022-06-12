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
  }

  resetLS() {//turn local storage into default
    localStorage.setItem('admin', JSON.stringify(false));
    localStorage.setItem('user', null);
  }

  updateLS(item) {
    if (item == "admin") {//update admin
      this.getIsAdmin().then(v => {
        localStorage.setItem('admin', JSON.stringify(v));
      })
    }
  }

  setLocalUserData(userData) {
    localStorage.setItem('user', JSON.stringify(userData));
  }


  getIsAdmin() {//intended to be used after login, this determines if it is admin
    return new Promise((resolve, reject) => {
      if (this.userStatus())
        this.das.getAdminWithEmail(JSON.parse(localStorage.getItem('user')).email)
          .then(v => {//receive length of the corresponding querysnapshot doc
            if (v > 0) {
              console.log("User found admin", v);
              resolve(true);
            } else {
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
}


