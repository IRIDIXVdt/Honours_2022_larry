import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddQuestionPageRoutingModule } from './add-question-routing.module';

import { AddQuestionPage } from './add-question.page';
// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [
    CKEditorModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AddQuestionPageRoutingModule
  ],
  declarations: [AddQuestionPage]
})
export class AddQuestionPageModule {}
