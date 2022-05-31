import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Demo02PageRoutingModule } from './demo02-routing.module';

import { Demo02Page } from './demo02.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Demo02PageRoutingModule
  ],
  declarations: [Demo02Page]
})
export class Demo02PageModule {}
