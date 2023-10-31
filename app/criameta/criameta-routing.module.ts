import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriametaPage } from './criameta.page';

const routes: Routes = [
  {
    path: '',
    component: CriametaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriametaPageRoutingModule {}
