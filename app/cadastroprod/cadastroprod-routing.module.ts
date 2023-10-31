import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroprodPage } from './cadastroprod.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroprodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroprodPageRoutingModule {}
