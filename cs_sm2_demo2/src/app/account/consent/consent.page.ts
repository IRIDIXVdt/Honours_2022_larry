import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/service/database.service';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.page.html',
  styleUrls: ['./consent.page.scss'],
})
export class ConsentPage implements OnInit {
  consent: boolean;
  constructor(
    public los: LocalStorageService,
    public das: DatabaseService,
  ) {
    this.consent = this.los.fetchLocalData('consent') as boolean;
    console.log(this.consent);
  }

  ngOnInit() {
  }

  consentOnChange() {
    console.log('update consent state to ', this.consent);
    this.los.setLocalData('consent', this.consent);
    this.das.uploadConsent(this.consent);
  }

}
