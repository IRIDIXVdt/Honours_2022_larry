import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionPageRoutingModule } from './question-routing.module';

import { QuestionPage } from './question.page';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [
    CKEditorModule,
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionPageRoutingModule
  ],
  declarations: [QuestionPage]
})
export class QuestionPageModule {}
