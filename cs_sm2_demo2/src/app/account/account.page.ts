import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';
import { FirebaseService } from '../shared/service/firebase.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    public aus: AuthService,
    public afs: FirebaseService,
  ) {
    // afs.getDocument('users', '0PBmtDa6DIM2igdjKJv54GtWt1o2').subscribe(v=>{
    //   console.log(v);
    //   const newD = {
    //     email: v.data()['email'],
    //   }
    //   console.log(newD);
    // })
  }

  ngOnInit() {
  }

  displayLogininfo() {
    console.log(this.aus.isLogin());
    console.log(localStorage);
  }
}
