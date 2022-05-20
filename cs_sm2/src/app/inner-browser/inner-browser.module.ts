import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InnerBrowserPageRoutingModule } from './inner-browser-routing.module';

import { InnerBrowserPage } from './inner-browser.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InnerBrowserPageRoutingModule
  ],
  declarations: [InnerBrowserPage]
})
export class InnerBrowserPageModule {}
