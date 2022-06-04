import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: 'login',
        loadChildren: () => import('../account/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'add',
        loadChildren: () => import('../add-question/add-question.module').then(m => m.AddQuestionPageModule)
      },
      {
        path: 'browse',
        loadChildren: () => import('../browse/browse.module').then(m => m.BrowsePageModule)
      },
      {
        path: 'demo01',
        loadChildren: () => import('../demo01/demo01.module').then(m => m.Demo01PageModule)
      },
      {
        path: 'demo02',
        loadChildren: () => import('../demo02/demo02.module').then(m => m.Demo02PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/account',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/account',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
