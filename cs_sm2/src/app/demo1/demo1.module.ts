import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Demo1PageRoutingModule } from './demo1-routing.module';

import { Demo1Page } from './demo1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Demo1PageRoutingModule
  ],
  declarations: [Demo1Page]
})
export class Demo1PageModule {}
