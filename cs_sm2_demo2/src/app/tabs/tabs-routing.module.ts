import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { LoginGuard } from '../shared/guard/login.guard';

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
        path: 'account/login',
        loadChildren: () => import('../account/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: 'account/register',
        loadChildren: () => import('../account/register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'account/reset',
        loadChildren: () => import('../account/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
      },
      {
        path: 'account/verify',
        loadChildren: () => import('../account/email-verify/email-verify.module').then(m => m.EmailVerifyPageModule)
      },
      {
        path: 'add',
        canActivate: [LoginGuard],
        loadChildren: () => import('../add-question/add-question.module').then(m => m.AddQuestionPageModule)
      },
      {
        path: 'browse',
        canActivate: [LoginGuard],
        loadChildren: () => import('../browse/browse.module').then(m => m.BrowsePageModule)
      },
      {
        path: 'demo01',
        canActivate: [LoginGuard],
        loadChildren: () => import('../demo01/demo01.module').then(m => m.Demo01PageModule)
      },
      {
        path: 'demo02',
        canActivate: [LoginGuard],
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
export class TabsPageRoutingModule { }
