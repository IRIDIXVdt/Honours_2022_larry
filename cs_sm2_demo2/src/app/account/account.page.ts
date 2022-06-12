import { Component, OnInit } from '@angular/core';
import { AlertService } from '../shared/service/alert.service';
import { AuthService } from '../shared/service/auth.service';
import { DatabaseService } from '../shared/service/database.service';
import { FirebaseService } from '../shared/service/firebase.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  sessionId = '';
  sList: any;
  constructor(
    public aus: AuthService,
    public afs: FirebaseService,
    public das: DatabaseService,
    public als: AlertService,
  ) {
    if (!this.aus.isAdmin()) {//normal user
      //load sList
      this.fetchSession();
    }

  }

  fetchSession() {
    this.sList = null;
    this.das.getSessionData('All').then(v => {
      this.sList = v;
      console.log(this.sList);
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
