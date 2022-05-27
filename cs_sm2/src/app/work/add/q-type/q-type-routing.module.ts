import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QTypePage } from './q-type.page';

const routes: Routes = [
  {
    path: '',
    component: QTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QTypePageRoutingModule {}
