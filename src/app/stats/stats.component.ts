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
  uploadedSize: Number;
  fileSize: Number;
  url: String;
  progress?: Number;
  remain: Number;
}

// Creation du composant
@Component({
  selector: 'stats', // selecteur
  templateUrl: './stats.component.html', // HTML
  styleUrls: ['./stats.component.css'], // CSS
  providers: [StatsService], // Service associés
})
export class StatsComponent {
  // attributs exportés
  stats: Array<Stats>; // tableau de stats
  isAscending: Boolean; // variable de tri défini
  handlers = { // un handler composé de fonctions
    //Progress
    progress(video) {
      let videoStats = _.find(this.stats, { _id: video._id });
      if (!videoStats) {
        video.progress = this.getProgress(video);
        video.remain = this.getEstimateUploaded(video);
        this.stats.push(video);
        this.isAscending = false;
        return this.sortByDate();
      }
      (<Stats>videoStats).uploadDuration = _.now() - +new Date((<Stats>videoStats).uploadedAt);
      (<Stats>videoStats).progress = this.getProgress(video);
      (<Stats>videoStats).remain = this.getEstimateUploaded(video);
    },

    // Response
    response(video) {
      _.forEach(this.stats, (stat, i) => {
        if (stat._id === video._id) {
          video.progress = 100;
          this.stats[i] = video;
        }
      });
    },

    // Stats
    stats(stats) {
      this.stats = stats.map(stat => {
        if(stat.status === 'UPLOADED') {
          stat.progress = 100;
        }
        return stat;
      });
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

  // Initialisation des events
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

  getProgress(video) {
    return Math.round((video.uploadedSize / video.fileSize) * 100);
  }

  getEstimateUploaded(video) {
    const interval = _.now() - +new Date(video.uploadedAt);
    return ((video.fileSize / video.uploadedSize) * interval) - interval;
  }
}


