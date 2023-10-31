import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriametaPageRoutingModule } from './criameta-routing.module';

import { CriametaPage } from './criameta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriametaPageRoutingModule
  ],
  declarations: [CriametaPage]
})
export class CriametaPageModule {}
