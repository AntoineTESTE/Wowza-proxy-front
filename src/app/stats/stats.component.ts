import { Component } from '@angular/core';
import { StatsService } from './stats.services';
import * as _ from 'lodash';

// Implémentation de l'interface de Stats avec ses attributs
interface Stats {
  _id: String;
  name: String;
  uploadedAt: Date;
  uploadDuration: Number;
  status: String;
  progress: String;
  url: String;
}

// Creation du composant
@Component({
  selector: 'stats', // selecteur
  templateUrl: './stats.component.html', // HTML
  styleUrls: ['./stats.component.css'], // CSS
  providers: [StatsService], // Service associés
})
export class StatsComponent {
  // attributs exortés
  stats: Array<Stats>; // tableau de stats
  isAscending: Boolean; // variable de tri défini
  handlers = {
    progress(video) {
      let videoStats = _.find(this.stats, { _id: video._id });
      if(!videoStats) {
        this.stats.push(video);
        this.isAscending = false;
        return this.sortByDate();
      }
      (<Stats>videoStats).progress = video.progress;
    },

    response(video) {
      _.forEach(this.stats, (stat, i) => {
        if(stat._id === video._id) {
          this.stats[i] = video;
        }
      });
    },

    stats(stats) {
      this.stats = stats;
      this.sortByDate();
    }
  };

  // construction des services de l'API
  constructor(
    private statsService: StatsService
  ) { }

  // Fonction de stats
  ngOnInit() {
    this.initEvents();
  }

  initEvents() {
    this.statsService.eventCallback$.subscribe(([event, payload]) => {
      this.handlers[event].call(this, payload);
    });
  }

  // Fonction de tri
  sortByDate() {
    this.isAscending = !this.isAscending;
    this.stats = _.orderBy(this.stats, 'uploadedAt', this.isAscending ? 'desc' : 'asc');
  }
}


