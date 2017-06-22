import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StatsComponent } from './Stats/app.StatsComponent';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FilterPipe } from './Stats/app.StatsComponent';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    StatsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
