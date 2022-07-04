import { Component, OnInit } from '@angular/core';
import { AlertService } from '../shared/service/alert.service';
import { AuthService } from '../shared/service/auth.service';
import { DatabaseService } from '../shared/service/database.service';
import { FirebaseService } from '../shared/service/firebase.service';
import { LocalStorageService } from '../shared/service/local-storage.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  sessionId = '';
  sList: any;
  sessionList;//store normal user session list
  constructor(
    public aus: AuthService,
    public afs: FirebaseService,
    public das: DatabaseService,
    public als: AlertService,
    public los: LocalStorageService,
  ) {
    console.log(!this.aus.isAdmin(),this.los.userStatus())
    if (!this.aus.isAdmin() && this.los.userStatus()) {//normal user
      //load sList
      this.fetchSession();
    }

  }

  displayLocalStorage() {
    console.log(localStorage)
  }

  generateSessionList() {
    //get sessionid List
    const sessionIdList: string[] = this.das.getLocalUserSessionList();
    console.log(sessionIdList);
    //if list greater than 0
    if (sessionIdList != null && sessionIdList.length > 0) {
      console.log('generate')
      //get all the sessions
      //it is available in sList
      //initialize the local sessionlist variable
      this.sessionList = [];
      for (let i = 0; i < this.sList.length; i++) {//iterate through all the list
        if (sessionIdList.filter(e => e == this.sList[i].id).length > 0) {
          console.log(this.sessionList)
          this.sessionList.push(this.sList[i]);
        }
      }

      // for (let i = 0; i < this.sessionId.length; i++) {
      //   //iterate through all the list
      //   console.log('current sesion id', sessionIdList[i]);
      //   if (this.sList.filter(e => e.id == sessionIdList[i]).length > 0) {
      //     this.sessionList.push(sessionIdList[i]);
      //   }
      // }
    }
    console.log(this.sessionList, this.sList);
    //store information in the sessionList
  }

  fetchSession() {
    this.sList = null;
    this.das.getSessionData('All').then(v => {
      this.sList = v;
      console.log(this.sList);
      this.generateSessionList();
    });
  }

  joinSession() {
    this.als.presentChoice("Are you sure you want to join this session?").then(loadingItem => {
      if (loadingItem) {//throw loadingItem, dismiss it when action is finished
        loadingItem.dismiss();
        this.das.addUserSession(this.sessionId);
      } else {
        console.log('dismiss');
      }
    })
  }

  ngOnInit() {
  }

  displayLogininfo() {
    console.log(this.aus.isLogin());
    console.log(localStorage);
  }
}
