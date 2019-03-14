import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRecouvrement } from 'app/shared/model/recouvrement.model';
import { RecouvrementService } from './recouvrement.service';
import { IVente } from 'app/shared/model/vente.model';
import { VenteService } from 'app/entities/vente';

@Component({
    selector: 'jhi-recouvrement-update',
    templateUrl: './recouvrement-update.component.html'
})
export class RecouvrementUpdateComponent implements OnInit {
    private _recouvrement: IRecouvrement;
    isSaving: boolean;

    ventes: IVente[];
    dateRecDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private recouvrementService: RecouvrementService,
        private venteService: VenteService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ recouvrement }) => {
            this.recouvrement = recouvrement;
        });
        this.venteService.query().subscribe(
            (res: HttpResponse<IVente[]>) => {
                this.ventes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.recouvrement.id !== undefined) {
            this.subscribeToSaveResponse(this.recouvrementService.update(this.recouvrement));
        } else {
            this.subscribeToSaveResponse(this.recouvrementService.create(this.recouvrement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRecouvrement>>) {
        result.subscribe((res: HttpResponse<IRecouvrement>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackVenteById(index: number, item: IVente) {
        return item.id;
    }
    get recouvrement() {
        return this._recouvrement;
    }

    set recouvrement(recouvrement: IRecouvrement) {
        this._recouvrement = recouvrement;
    }
}
