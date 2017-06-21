import { Component } from '@angular/core';
import { StatsComponent } from './Stats/app.StatsComponent';
import { AppService } from './app.services';




@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AppService],
})

export class AppComponent {




    // constructeur des services de l'API
    constructor(
        private appService: AppService
    ) { }


}
