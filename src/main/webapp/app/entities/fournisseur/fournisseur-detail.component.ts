import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFournisseur } from 'app/shared/model/fournisseur.model';

@Component({
    selector: 'jhi-fournisseur-detail',
    templateUrl: './fournisseur-detail.component.html'
})
export class FournisseurDetailComponent implements OnInit {
    fournisseur: IFournisseur;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ fournisseur }) => {
            this.fournisseur = fournisseur;
        });
    }

    previousState() {
        window.history.back();
    }
}
