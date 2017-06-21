import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StatsComponent } from './Stats/app.StatsComponent';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
