import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Demo01Page } from './demo01.page';

const routes: Routes = [
  {
    path: '',
    component: Demo01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Demo01PageRoutingModule {}
