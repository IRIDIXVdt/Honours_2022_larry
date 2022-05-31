import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkPage } from './work.page';

const routes: Routes = [
  {
    path: '',
    component: WorkPage
  },
  // {
  //   path: 'demo1',
  //   loadChildren: () => import('./demo1/demo1.module').then( m => m.Demo1PageModule)
  // },
  // {
  //   path: 'demo2',
  //   loadChildren: () => import('./demo2/demo2.module').then( m => m.Demo2PageModule)
  // },
  // {
  //   path: 'add',
  //   loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkPageRoutingModule {}
