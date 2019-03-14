import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReglement } from 'app/shared/model/reglement.model';

@Component({
    selector: 'jhi-reglement-detail',
    templateUrl: './reglement-detail.component.html'
})
export class ReglementDetailComponent implements OnInit {
    reglement: IReglement;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ reglement }) => {
            this.reglement = reglement;
        });
    }

    previousState() {
        window.history.back();
    }
}
