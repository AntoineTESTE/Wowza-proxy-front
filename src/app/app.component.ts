import { Component } from '@angular/core';
//import { StartComponent } from './Start/app.StartComponent';
//import { StopComponent } from './Stop/app.StopComponent';
import { StatsComponent } from './Stats/app.StatsComponent';
import { AppService } from './app.services';


interface Stat {
    id: string;
    name: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {

    stats: Stat;


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
