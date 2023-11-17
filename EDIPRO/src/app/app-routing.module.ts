import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'asistente',
    pathMatch: 'full'
  },
  {
    path: 'myget',
    loadChildren: () => import('./myget/myget.module').then( m => m.MygetPageModule)
  },
  {
    path: 'asistente',
    loadChildren: () => import('./asistente/asistente.module').then( m => m.AsistentePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
