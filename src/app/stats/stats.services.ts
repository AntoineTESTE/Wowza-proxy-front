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
  eventCallback$ = this.eventCallback.asObservable(); // Creation d'une isntance Observable

  constructor(private http: Http) {
    var client = new Nes.Client('ws://localhost:8086'); // Création de la Websocket
    client.connect((err) => {
      if (err) {
        return console.error(`ERROR during websocket connection: ${err}`);
      }
      this.initWebsocketHandlers(client); // Appel de l'initialiseur
    });
  }

  // Initialisation Websocket
  initWebsocketHandlers(client) {
    client.request('/videos/stats', (err, payload) => {
      this.eventCallback.next(['stats', payload]); // Emission d'un event "stats"
    });

    ['progress', 'response'].forEach((event) => { // tableau d'events "progress", "response"
      client.subscribe(`/videos/${event}`, (video, flags) => { // Reception des evenements
        if (video.isTrusted) {
          video = JSON.parse(video.data).message;
        }
        this.eventCallback.next([event, video]); // Emission d'un des events du tableau
      }, (err) => { });
    });
  }
}
