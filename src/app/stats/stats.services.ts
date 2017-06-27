import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as Nes from 'nes';


// Appel des routes de l'API
@Injectable()
export class StatsService {
  private eventCallback: Subject<any[]> = new Subject<any>();
  eventCallback$ = this.eventCallback.asObservable();

  constructor(private http: Http) {
    var client = new Nes.Client('ws://localhost:8086');
    client.connect((err) => {
      if(err) {
        return console.error(`ERROR during websocket connection: ${err}`);
      }
      this.initWebsocketHandlers(client);
    });
  }

  initWebsocketHandlers(client) {
    client.request('/videos/stats', (err, payload) => {
       this.eventCallback.next(['stats', payload]);
    });
    client.subscribe('/videos/progress', (status, flags) => {
      if(status.isTrusted) {
        status = JSON.parse(status.data).message;
      }
      this.eventCallback.next(['progress', status]);
    }, (err) => {

    });
  }
}
