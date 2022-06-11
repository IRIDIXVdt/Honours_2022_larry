import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
  }

  displayLogininfo() {
    console.log(this.aus.isLogin());
    console.log(localStorage);
  }
}
