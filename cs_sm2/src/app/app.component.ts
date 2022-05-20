import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Account', url: '/account', icon: 'cog' },
    { title: 'Work', url: '/work', icon: 'albums' },
    { title: 'Statistics', url: '/stat', icon: 'podium' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
