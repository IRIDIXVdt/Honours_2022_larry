import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    public aus: AuthService,
  ) { }

  ngOnInit() {
  }

  displayLogininfo(){
    console.log(this.aus.isLogin());
    console.log(localStorage);
  }
}
