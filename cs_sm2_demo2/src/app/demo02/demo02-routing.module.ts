import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Demo02Page } from './demo02.page';

const routes: Routes = [
  {
    path: '',
    component: Demo02Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Demo02PageRoutingModule {}
