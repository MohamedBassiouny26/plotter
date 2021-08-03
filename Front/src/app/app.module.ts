import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
