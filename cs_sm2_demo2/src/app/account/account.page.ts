import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(
    public au: AuthService,
  ) { }

  ngOnInit() {
  }

  displayLogininfo(){
    console.log(this.au.isLogin());
    console.log(localStorage);
  }
}
