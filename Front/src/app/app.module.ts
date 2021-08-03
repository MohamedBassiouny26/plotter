import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { PlotterComponent } from './plotter/plotter.component';
import { ChartsModule } from 'ng2-charts/';

@NgModule({
  declarations: [
    AppComponent,
    PlotterComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
