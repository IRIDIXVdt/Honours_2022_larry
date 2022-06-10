import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },  {
    path: 'session',
    loadChildren: () => import('./admin/session/session.module').then( m => m.SessionPageModule)
  },
  {
    path: 'question',
    loadChildren: () => import('./admin/question/question.module').then( m => m.QuestionPageModule)
  },
  {
    path: 'browse',
    loadChildren: () => import('./admin/browse/browse.module').then( m => m.BrowsePageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
