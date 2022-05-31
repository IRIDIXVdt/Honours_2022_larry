import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Account', url: '/tabs/account', icon: 'cog' },
    { title: 'Demo', url: '/tabs/demo01', icon: 'clipboard' },
    { title: 'Add', url: '/tabs/add', icon: 'add-circle' },
    { title: 'Browse', url: '/tabs/browse', icon: 'albums' },
  ];
  constructor() {

  }

}
