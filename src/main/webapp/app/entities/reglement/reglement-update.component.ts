import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IReglement } from 'app/shared/model/reglement.model';
import { ReglementService } from './reglement.service';
import { IAchat } from 'app/shared/model/achat.model';
import { AchatService } from 'app/entities/achat';

@Component({
    selector: 'jhi-reglement-update',
    templateUrl: './reglement-update.component.html'
})
export class ReglementUpdateComponent implements OnInit {
    private _reglement: IReglement;
    isSaving: boolean;

    achats: IAchat[];
    dateRecDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private reglementService: ReglementService,
        private achatService: AchatService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ reglement }) => {
            this.reglement = reglement;
        });
        this.achatService.query().subscribe(
            (res: HttpResponse<IAchat[]>) => {
                this.achats = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.reglement.id !== undefined) {
            this.subscribeToSaveResponse(this.reglementService.update(this.reglement));
        } else {
            this.subscribeToSaveResponse(this.reglementService.create(this.reglement));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IReglement>>) {
        result.subscribe((res: HttpResponse<IReglement>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAchatById(index: number, item: IAchat) {
        return item.id;
    }
    get reglement() {
        return this._reglement;
    }

    set reglement(reglement: IReglement) {
        this._reglement = reglement;
    }
}
