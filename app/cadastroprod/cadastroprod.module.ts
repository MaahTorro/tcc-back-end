import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroprodPageRoutingModule } from './cadastroprod-routing.module';

import { CadastroprodPage } from './cadastroprod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroprodPageRoutingModule
  ],
  declarations: [CadastroprodPage]
})
export class CadastroprodPageModule {}
