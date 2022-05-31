import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Account', url: '/tabs/tab1', icon: 'cog' },
    { title: 'Work', url: '/tabs/tab2', icon: 'albums' },
    { title: 'Statistics', url: '/tabs/tab3', icon: 'podium' },
  ];
  constructor() {

  }

}
