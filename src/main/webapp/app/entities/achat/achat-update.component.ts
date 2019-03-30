import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAchat } from 'app/shared/model/achat.model';
import { AchatService } from './achat.service';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { FournisseurService } from 'app/entities/fournisseur';
import { IFactureAchat } from 'app/shared/model/facture-achat.model';
import { FactureAchatService } from 'app/entities/facture-achat';

@Component({
    selector: 'jhi-achat-update',
    templateUrl: './achat-update.component.html'
})
export class AchatUpdateComponent implements OnInit {
    private _achat: IAchat;
    isSaving: boolean;

    fournisseurs: IFournisseur[];

    factureachats: IFactureAchat[];
    dateAchatDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private achatService: AchatService,
        private fournisseurService: FournisseurService,
        private factureAchatService: FactureAchatService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ achat }) => {
            this.achat = achat;
        });
        this.fournisseurService.query().subscribe(
            (res: HttpResponse<IFournisseur[]>) => {
                this.fournisseurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.factureAchatService.query().subscribe(
            (res: HttpResponse<IFactureAchat[]>) => {
                this.factureachats = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.achat.id !== undefined) {
            this.subscribeToSaveResponse(this.achatService.update(this.achat));
        } else {
            this.subscribeToSaveResponse(this.achatService.create(this.achat));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAchat>>) {
        result.subscribe((res: HttpResponse<IAchat>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFournisseurById(index: number, item: IFournisseur) {
        return item.id;
    }

    trackFactureAchatById(index: number, item: IFactureAchat) {
        return item.id;
    }
    get achat() {
        return this._achat;
    }

    set achat(achat: IAchat) {
        this._achat = achat;
    }
}
