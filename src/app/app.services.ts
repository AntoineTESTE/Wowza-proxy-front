import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


// Appel des routes de l'API
@Injectable()
export class AppService {
    baseUrl = 'http://localhost:8086/';

    constructor(private http: Http) { }


    // Route de récupération de tous les animaux
    findStats() {
        return this.http.get(`${this.baseUrl}/videos/stats`)
            .map(this.extractData); // si quelque chose est attendu en retour de la méthode appelé par la route
    }

    //Conversion Http ->json
    private extractData(res: Response) {
        return res.json();
    }
}