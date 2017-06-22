import { Component } from '@angular/core';
import { AppService } from 'app/app.services';
import { Pipe, PipeTransform } from '@angular/core';


interface Stats {
  id: string;
  name: string;
  uploadedAt: Date;
  uploadDuration: Number;
  status: string
}


@Component({
  selector: 'stats',
  templateUrl: './Stats.html',
  providers: [AppService],
})


export class StatsComponent {

  stats: Stats;
  // constructeur des services de l'API
  constructor(
    private appService: AppService
  ) { }


  // Fonction de stats

  getStats() {
    this.appService.findStats() // le fonction Find est appelé
      .subscribe( // souscription 
      (stats) => this.stats = stats, // retour = stats
      (err) => console.error(err) // sinon erreur
      );
  }
}




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