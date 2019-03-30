import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFactureAchat } from 'app/shared/model/facture-achat.model';

@Component({
    selector: 'jhi-facture-achat-detail',
    templateUrl: './facture-achat-detail.component.html'
})
export class FactureAchatDetailComponent implements OnInit {
    factureAchat: IFactureAchat;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ factureAchat }) => {
            this.factureAchat = factureAchat;
        });
    }

    previousState() {
        window.history.back();
    }
}
