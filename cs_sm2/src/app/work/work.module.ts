import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkPageRoutingModule } from './work-routing.module';

import { WorkPage } from './work.page';
// import { Demo1Page } from './demo1/demo1.page';
// import { Demo2Page } from './demo2/demo2.page';
import { AddPage } from '../add/add.page';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkPageRoutingModule,
    CKEditorModule,
    // Demo1Page
  ],
  declarations: [
    WorkPage,
    // Demo1Page,
    // Demo2Page,
    // AddPage,
  ]
})
export class WorkPageModule { }
