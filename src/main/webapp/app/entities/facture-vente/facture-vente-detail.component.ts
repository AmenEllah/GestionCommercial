import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFactureVente } from 'app/shared/model/facture-vente.model';

@Component({
    selector: 'jhi-facture-vente-detail',
    templateUrl: './facture-vente-detail.component.html'
})
export class FactureVenteDetailComponent implements OnInit {
    factureVente: IFactureVente;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ factureVente }) => {
            this.factureVente = factureVente;
        });
    }

    previousState() {
        window.history.back();
    }
}
