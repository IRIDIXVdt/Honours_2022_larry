import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { LoginGuard } from '../shared/guard/login.guard';
import { LoginNoAccessGuard } from '../shared/guard/login-no-access.guard';
import { AdminAccessGuard } from '../shared/guard/admin-access.guard';

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
        path: 'account/register',
        canActivate: [LoginNoAccessGuard],
        loadChildren: () => import('../account/register/register.module').then(m => m.RegisterPageModule)
      },
      {
        path: 'account/login',
        canActivate: [LoginNoAccessGuard],
        loadChildren: () => import('../account/login/login.module').then(m => m.LoginPageModule)
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
        path: 'account/admin/question',//for browsing and releasing new question
        loadChildren: () => import('../admin/browse/browse.module').then(m => m.BrowsePageModule)
      },
      {
        path: 'account/admin/question',//for defining new question
        loadChildren: () => import('../admin/question/question.module').then(m => m.QuestionPageModule)
      },
      {
        path: 'account/admin/question',//for defining new session
        loadChildren: () => import('../admin/session/session.module').then(m => m.SessionPageModule)
      },
      {
        path: 'add',
        canActivate: [AdminAccessGuard],
        loadChildren: () => import('../add-question/add-question.module').then(m => m.AddQuestionPageModule)
      },
      {
        path: 'browse',
        canActivate: [AdminAccessGuard],
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
