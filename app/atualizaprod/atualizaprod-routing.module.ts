import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtualizaprodPage } from './atualizaprod.page';

const routes: Routes = [
  {
    path: '',
    component: AtualizaprodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtualizaprodPageRoutingModule {}
