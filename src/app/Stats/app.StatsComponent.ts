import { Component } from '@angular/core';
import { AppService } from 'app/app.services';

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
