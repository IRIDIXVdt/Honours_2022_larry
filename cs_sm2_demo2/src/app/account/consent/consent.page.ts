import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/service/alert.service';
import { DatabaseService } from 'src/app/shared/service/database.service';
import { LocalStorageService } from 'src/app/shared/service/local-storage.service';

@Component({
  selector: 'app-consent',
  templateUrl: './consent.page.html',
  styleUrls: ['./consent.page.scss'],
})
export class ConsentPage implements OnInit {
  consent: boolean;
  consentW: boolean;
  constructor(
    public los: LocalStorageService,
    public das: DatabaseService,
    public als: AlertService,
  ) {
    this.consent = this.los.fetchLocalData('consent') as boolean;
    console.log(this.consent);
    this.consentW = false;
  }

  ngOnInit() {
  }

  consentOnChange() {
    console.log('update consent state to ', this.consent);
    this.los.setLocalData('consent', this.consent);
    this.das.uploadConsent(this.consent);
  }

  withdraw() {
    if (this.consentW) {
      this.als.presentChoice('Are you sure you want to withdraw consent? Once you withdraw all information collected will be permanently removed.').then(loading => {
        this.consentW = false;
        if (loading) {
          loading.dismiss();
          this.consent = false;
          this.consentOnChange();
        }
      })
    }


  }

}
