import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { StatsComponent } from './stats.component';
import { FilterPipe } from './stats.filter.pipe';

@NgModule({
  declarations: [
    StatsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  exports: [
    StatsComponent
  ]
})
export class StatsModule { }
