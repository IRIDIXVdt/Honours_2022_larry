import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Demo2PageRoutingModule } from './demo2-routing.module';

import { Demo2Page } from './demo2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Demo2PageRoutingModule
  ],
  declarations: [Demo2Page]
})
export class Demo2PageModule {}
