import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaprodPageRoutingModule } from './listaprod-routing.module';

import { ListaprodPage } from './listaprod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaprodPageRoutingModule
  ],
  declarations: [ListaprodPage]
})
export class ListaprodPageModule {}
