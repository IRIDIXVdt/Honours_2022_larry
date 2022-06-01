import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QTypePageRoutingModule } from './q-type-routing.module';

import { QTypePage } from './q-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QTypePageRoutingModule
  ],
  declarations: [QTypePage]
})
export class QTypePageModule {}
