import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'work',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'inner-browser',
    loadChildren: () => import('./inner-browser/inner-browser.module').then( m => m.InnerBrowserPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'work',
    loadChildren: () => import('./work/work.module').then( m => m.WorkPageModule)
  },
  {
    path: 'stat',
    loadChildren: () => import('./stat/stat.module').then( m => m.StatPageModule)
  },
  {
    path: 'demo1',
    loadChildren: () => import('./demo1/demo1.module').then( m => m.Demo1PageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
