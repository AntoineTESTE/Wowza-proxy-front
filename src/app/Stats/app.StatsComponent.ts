import { Component } from '@angular/core';
import { AppService } from 'app/app.services';
import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";


// Implémentation de l'interface de Stats avec ses attributs
interface Stats {
  id: String;
  name: String;
  uploadedAt: Date;
  uploadDuration: Number;
  status: String
  url: String
}

// Creation du composant 
@Component({
  selector: 'stats', // selecteur
  templateUrl: './Stats.html', // HTML
  styleUrls: ['./Stats.css'], // CSS
  providers: [AppService], // Service associés
})


export class StatsComponent {

  // attributs exortés

  stats: Array<Stats>; // tableau de stats
  isAscending: Boolean; // variable de tri défini

  // construction des services de l'API
  constructor(
    private appService: AppService
  ) { }


  // Fonction de stats

  ngOnInit() {
    this.appService.findStats() // le fonction Find est appelé
      .subscribe( // souscription 
      (stats) => this.stats = stats, // retour = stats
      (err) => console.error(err) // sinon erreur
      );

  }

  // Fonction de tri

  sortByDate() {
    this.isAscending = !this.isAscending;
    this.stats = _.orderBy(this.stats, 'uploadedAt', this.isAscending ? 'asc' : 'desc');

  }
}
// Search bar
@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform(stats: any, query?: any): any {

    if (query === undefined) return stats;

    return stats.filter(function (stat) {
      return stat.name.toLowerCase().includes(query.toLowerCase())
    })
  }

}



