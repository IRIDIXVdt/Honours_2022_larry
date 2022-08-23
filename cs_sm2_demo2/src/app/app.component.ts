import { Component } from '@angular/core';
import { LocalStorageService } from './shared/service/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Account', url: '/tabs/account', icon: 'cog' },
    { title: 'Test', url: '/tabs/demo01', icon: 'clipboard' },
    { title: 'Task', url: '/tabs/demo02', icon: 'clipboard' },
    // { title: 'Add', url: '/tabs/add', icon: 'add-circle' },
    // { title: 'Browse', url: '/tabs/browse', icon: 'albums' },
  ];
  constructor(
    public los: LocalStorageService,
  ) {

  }

}
