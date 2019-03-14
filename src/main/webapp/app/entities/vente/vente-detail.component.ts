import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVente } from 'app/shared/model/vente.model';

@Component({
    selector: 'jhi-vente-detail',
    templateUrl: './vente-detail.component.html'
})
export class VenteDetailComponent implements OnInit {
    vente: IVente;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vente }) => {
            this.vente = vente;
        });
    }

    previousState() {
        window.history.back();
    }
}
