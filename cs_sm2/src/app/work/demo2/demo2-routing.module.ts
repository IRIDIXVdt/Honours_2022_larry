import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Demo2Page } from './demo2.page';

const routes: Routes = [
  {
    path: '',
    component: Demo2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Demo2PageRoutingModule {}
