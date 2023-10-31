import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaprodPage } from './listaprod.page';

const routes: Routes = [
  {
    path: '',
    component: ListaprodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaprodPageRoutingModule {}
