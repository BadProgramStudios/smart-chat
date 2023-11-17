import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MygetPage } from './myget.page';

const routes: Routes = [
  {
    path: '',
    component: MygetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MygetPageRoutingModule {}
