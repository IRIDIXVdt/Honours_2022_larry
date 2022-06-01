import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Account', url: '/tabs/account', icon: 'cog' },
    { title: 'CALL: Spaced Repetition Software Demo', url: '/tabs/demo01', icon: 'clipboard' },
    { title: 'New Demo', url: '/tabs/demo02', icon: 'clipboard' },
    { title: 'Add', url: '/tabs/add', icon: 'add-circle' },
    { title: 'Browse', url: '/tabs/browse', icon: 'albums' },
  ];
  constructor() {

  }

}
