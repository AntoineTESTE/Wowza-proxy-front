import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { StatsComponent } from './stats.component';
import { FilterPipe } from './stats.filter.pipe';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

@NgModule({
  declarations: [
    StatsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  exports: [
    StatsComponent
  ]
})
export class StatsModule { }
