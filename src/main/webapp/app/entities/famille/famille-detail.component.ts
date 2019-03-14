import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFamille } from 'app/shared/model/famille.model';

@Component({
    selector: 'jhi-famille-detail',
    templateUrl: './famille-detail.component.html'
})
export class FamilleDetailComponent implements OnInit {
    famille: IFamille;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ famille }) => {
            this.famille = famille;
        });
    }

    previousState() {
        window.history.back();
    }
}
