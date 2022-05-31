import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Demo1Page } from './demo1.page';

const routes: Routes = [
  {
    path: '',
    component: Demo1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Demo1PageRoutingModule {}
