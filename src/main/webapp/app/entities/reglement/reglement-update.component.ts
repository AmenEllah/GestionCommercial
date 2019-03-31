import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IReglement } from 'app/shared/model/reglement.model';
import { ReglementService } from './reglement.service';
import { IAchat } from 'app/shared/model/achat.model';
import { AchatService } from 'app/entities/achat';
import { FournisseurService } from '../fournisseur';
import { IFournisseur } from 'app/shared/model/fournisseur.model';

@Component({
    selector: 'jhi-reglement-update',
    templateUrl: './reglement-update.component.html'
})
export class ReglementUpdateComponent implements OnInit {
    private _reglement: IReglement;
    isSaving: boolean;
    new: boolean;
    montantAncien: number;
    fournisseur: IFournisseur;

    achats: IAchat[];
    achat: IAchat;
    dateRecDp: any;
    id: number;

    constructor(
        private jhiAlertService: JhiAlertService,
        private reglementService: ReglementService,
        private achatService: AchatService,
        private fournisseurService: FournisseurService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.new = true;
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

        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = +params['idA'];
            if (this.id) {
                this.achatService.find(this.id).subscribe((res: HttpResponse<IAchat>) => {
                    this.achat = res.body;
                    this.reglement.achat = this.achat;
                    this.new = false;
                });
            }
        });

        this.montantAncien = this.reglement.montant;
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;

        if (this.reglement.id !== undefined) {
            this.achatService.find(this.reglement.achat.id).subscribe((data: HttpResponse<IAchat>) => {
                this.achat = data.body;
                this.achat.montantRestant -= this.reglement.montant - this.montantAncien;
                this.achatService.update(this.achat).subscribe();
            });

            this.fournisseurService.find(this.reglement.achat.fournisseur.id).subscribe((data: HttpResponse<IFournisseur>) => {
                this.fournisseur = data.body;
                this.fournisseur.montantRestant -= this.reglement.montant - this.montantAncien;
                this.fournisseurService.update(this.fournisseur).subscribe();
            });
            this.subscribeToSaveResponse(this.reglementService.update(this.reglement));
        } else {
            this.fournisseurService.find(this.reglement.achat.fournisseur.id).subscribe((data: HttpResponse<IFournisseur>) => {
                this.fournisseur = data.body;
                this.fournisseur.montantRestant -= this.reglement.montant;
                this.fournisseurService.update(this.fournisseur).subscribe();
            });
            this.achat.montantRestant = this.achat.montantRestant - this.reglement.montant;
            this.achatService.update(this.achat).subscribe();
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
