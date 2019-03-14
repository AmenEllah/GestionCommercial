import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRecouvrement } from 'app/shared/model/recouvrement.model';

@Component({
    selector: 'jhi-recouvrement-detail',
    templateUrl: './recouvrement-detail.component.html'
})
export class RecouvrementDetailComponent implements OnInit {
    recouvrement: IRecouvrement;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ recouvrement }) => {
            this.recouvrement = recouvrement;
        });
    }

    previousState() {
        window.history.back();
    }
}
