import { Component, OnInit } from '@angular/core';
import { AlertService } from '../shared/service/alert.service';
import { AuthService } from '../shared/service/auth.service';
import { DatabaseService } from '../shared/service/database.service';
import { FirebaseService } from '../shared/service/firebase.service';
import { LocalStorageService } from '../shared/service/local-storage.service';
import { UserRecordService } from '../shared/service/user-record.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  //only used when user want to join a selected session
  sessionId = '';
  //stores all the session list that have ever existed
  sList: any;
  //stores the session list which will be displayed
  sessionList;
  //decide whether user is allowed to join other sessions
  // allowJoinSession: boolean;
  dailyLimit: number;
  //setting limit to what the user want to do every day
  constructor(
    public aus: AuthService,
    public afs: FirebaseService,
    public das: DatabaseService,
    public als: AlertService,
    public los: LocalStorageService,
    public urs: UserRecordService,
  ) { }

  ionViewWillEnter(){
    console.log('will enter')
  }

  ionViewDidEnter() {
    console.log('enter');
    // this.allowJoinSession = true;
    this.sList = this.los.fetchLocalData('allList');
    this.loadDailyLimit();
    // console.log(this.sList);
    if (!this.aus.isAdmin() && this.los.userStatus() && !this.sessionList) {//normal user
      //for now, if user already has a sesssion, then prevent them from joining others
      // this.allowJoinSession = false;
      this.sessionList = this.los.fetchLocalData('userList');
      console.log(this.sList, this.sessionList);
      if (!this.sessionList){ //still no session
        this.sessionList = this.los.fetchLocalData('userList');
        this.als.presentChoice("Do you want to join COSC 211 Session?").then(loadingItem => {
          if (loadingItem) {//throw loadingItem, dismiss it when action is finished
            loadingItem.dismiss();
            this.sessionId = 'PR9r9Tigbv7DFx9xLUUn';
            this.das.addUserSession(this.sessionId);
          } else {
            console.log('dismiss');
          }
        })
      }
    }
    //to do: assign session instantly
  }

  loadDailyLimit() {
    this.dailyLimit = this.los.fetchLocalData('dailyLimit');
  }

  setDailyLimit() {
    this.urs.dailyLimitUpdate(this.dailyLimit);
    this.als.displayMessage("Daily Limit set to: " + this.dailyLimit);
  }

  // fetchSession() {
  //   this.sList = null;
  //   this.das.getSessionData('All').then(v => {
  //     this.sList = v;
  //     this.generateSessionList();
  //   });
  // }

  // generateSessionList() {
  //   //get sessionid List
  //   const sessionIdList: string[] = this.das.getLocalUserSessionList();
  //   //if list greater than 0
  //   if (sessionIdList != null && sessionIdList.length > 0) {
  //     //get all the sessions, available in sList
  //     //initialize the local sessionlist variable
  //     this.sessionList = [];
  //     for (let i = 0; i < this.sList.length; i++) {//iterate through all the list
  //       if (sessionIdList.filter(e => e == this.sList[i].id).length > 0) {
  //         this.sessionList.push(this.sList[i]);
  //       }
  //     }
  //   }
  //   console.log('session generate complete', this.sessionList, this.sList);
  //   //store information in the sessionList
  // }



  joinSession() {
    this.als.presentChoice("Are you sure you want to join this session?").then(loadingItem => {
      if (loadingItem) {//throw loadingItem, dismiss it when action is finished
        loadingItem.dismiss();
        this.das.addUserSession(this.sessionId);
        //find data
        this.ionViewDidEnter();
      } else {
        console.log('dismiss');
      }
    })
  }

  //update local session
  sessionListUpdate() {
    //update the collection of id (of user session) in local
    var originalList: any[] = this.los.fetchLocalData('sessionList');
    originalList.push(this.sessionId);
    this.los.setLocalData('sessionList', originalList);
    //now update all the information
    this.aus.storeSesssion();
  }

  ngOnInit() { }

  displayLogininfo() {
    console.log(this.aus.isLogin());
    // console.log(localStorage);
  }

  displayLocalStorage() {
    console.log(localStorage);
    // console.log(localStorage.getItem('previousProgress'));
  }
}
