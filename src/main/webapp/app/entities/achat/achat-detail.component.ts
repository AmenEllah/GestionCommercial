import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAchat } from 'app/shared/model/achat.model';

@Component({
    selector: 'jhi-achat-detail',
    templateUrl: './achat-detail.component.html'
})
export class AchatDetailComponent implements OnInit {
    achat: IAchat;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ achat }) => {
            this.achat = achat;
        });
    }

    previousState() {
        window.history.back();
    }
}
