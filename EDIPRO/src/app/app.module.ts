import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartEjemploComponent } from './components/chart-ejemplo/chart-ejemplo.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent, 
    ChartEjemploComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot({mode: 'ios'}), 
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
