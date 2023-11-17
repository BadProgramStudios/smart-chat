import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MygetPageRoutingModule } from './myget-routing.module';

import { MygetPage } from './myget.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MygetPageRoutingModule
  ],
  declarations: [MygetPage]
})
export class MygetPageModule {}
