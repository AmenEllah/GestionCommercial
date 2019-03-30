import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFactureAchat } from 'app/shared/model/facture-achat.model';
import { FactureAchatService } from './facture-achat.service';
import { IAchat } from 'app/shared/model/achat.model';
import { AchatService } from 'app/entities/achat';

@Component({
    selector: 'jhi-facture-achat-update',
    templateUrl: './facture-achat-update.component.html'
})
export class FactureAchatUpdateComponent implements OnInit {
    private _factureAchat: IFactureAchat;
    isSaving: boolean;

    achats: IAchat[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private factureAchatService: FactureAchatService,
        private achatService: AchatService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ factureAchat }) => {
            this.factureAchat = factureAchat;
        });
        this.achatService.query({ filter: 'factureachat-is-null' }).subscribe(
            (res: HttpResponse<IAchat[]>) => {
                if (!this.factureAchat.achat || !this.factureAchat.achat.id) {
                    this.achats = res.body;
                } else {
                    this.achatService.find(this.factureAchat.achat.id).subscribe(
                        (subRes: HttpResponse<IAchat>) => {
                            this.achats = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.factureAchat.id !== undefined) {
            this.subscribeToSaveResponse(this.factureAchatService.update(this.factureAchat));
        } else {
            this.subscribeToSaveResponse(this.factureAchatService.create(this.factureAchat));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFactureAchat>>) {
        result.subscribe((res: HttpResponse<IFactureAchat>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get factureAchat() {
        return this._factureAchat;
    }

    set factureAchat(factureAchat: IFactureAchat) {
        this._factureAchat = factureAchat;
    }
}
