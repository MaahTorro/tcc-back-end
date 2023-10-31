import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtualizaprodPageRoutingModule } from './atualizaprod-routing.module';

import { AtualizaprodPage } from './atualizaprod.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtualizaprodPageRoutingModule
  ],
  declarations: [AtualizaprodPage]
})
export class AtualizaprodPageModule {}
