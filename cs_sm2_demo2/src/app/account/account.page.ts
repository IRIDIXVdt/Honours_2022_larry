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
  //only used when user want to join a selected session
  sessionId = '';
  //stores the session list which will be displayed
  sList: any;
  //stores all the session list that have ever existed
  sessionList;
  constructor(
    public aus: AuthService,
    public afs: FirebaseService,
    public das: DatabaseService,
    public als: AlertService,
    public los: LocalStorageService,
  ) { }

  ionViewDidEnter() {
    //to do: verify that if user has selected the session, than don't refresh it
    if (!this.aus.isAdmin() && this.los.userStatus()) {//normal user
      this.fetchSession();
    }
  }

  fetchSession() {
    this.sList = null;
    this.das.getSessionData('All').then(v => {
      this.sList = v;
      this.generateSessionList();
    });
  }

  generateSessionList() {
    //get sessionid List
    const sessionIdList: string[] = this.das.getLocalUserSessionList();
    //if list greater than 0
    if (sessionIdList != null && sessionIdList.length > 0) {
      console.log('generate')
      //get all the sessions, available in sList
      //initialize the local sessionlist variable
      this.sessionList = [];
      for (let i = 0; i < this.sList.length; i++) {//iterate through all the list
        if (sessionIdList.filter(e => e == this.sList[i].id).length > 0) {
          console.log(this.sessionList)
          this.sessionList.push(this.sList[i]);
        }
      }
    }
    console.log('session generate complete', this.sessionList, this.sList);
    //store information in the sessionList
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

  ngOnInit() { }

  displayLogininfo() {
    console.log(this.aus.isLogin());
    console.log(localStorage);
  }

  displayLocalStorage() {
    console.log(localStorage)
  }
}
