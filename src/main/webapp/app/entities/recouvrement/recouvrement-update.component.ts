import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRecouvrement } from 'app/shared/model/recouvrement.model';
import { RecouvrementService } from './recouvrement.service';
import { IVente } from 'app/shared/model/vente.model';
import { VenteService } from 'app/entities/vente';
import { ClientService } from '../client';
import { IClient } from 'app/shared/model/client.model';

@Component({
    selector: 'jhi-recouvrement-update',
    templateUrl: './recouvrement-update.component.html'
})
export class RecouvrementUpdateComponent implements OnInit {
    private _recouvrement: IRecouvrement;
    isSaving: boolean;

    ventes: IVente[];
    dateRecDp: any;
    vente: IVente;
    montantAncien: number;
    client: IClient;
    new: boolean;
    id: number;

    supMontRest = false;

    constructor(
        private jhiAlertService: JhiAlertService,
        private recouvrementService: RecouvrementService,
        private venteService: VenteService,
        private activatedRoute: ActivatedRoute,
        private clientService: ClientService
    ) {}

    ngOnInit() {
        this.new = true;
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

        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = +params['idA'];
            if (this.id) {
                this.venteService.find(this.id).subscribe((res: HttpResponse<IVente>) => {
                    this.vente = res.body;
                    this.recouvrement.vente = this.vente;
                    this.new = false;
                });
            }
        });

        this.montantAncien = this.recouvrement.montant;
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;

        if (this.recouvrement.id !== undefined) {
            this.venteService.find(this.recouvrement.vente.id).subscribe((data: HttpResponse<IVente>) => {
                this.vente = data.body;
                const montantRestant = this.vente.montantRestant - this.recouvrement.montant + this.montantAncien;
                if (montantRestant < 0) {
                    this.supMontRest = true;
                    this.isSaving = false;
                    return;
                } else {
                    this.vente.montantRestant = montantRestant;
                }
                this.venteService.update(this.vente).subscribe();

                this.clientService.find(this.recouvrement.vente.client.id).subscribe((client: HttpResponse<IClient>) => {
                    this.client = client.body;
                    this.client.montantRestant -= this.recouvrement.montant - this.montantAncien;
                    this.clientService.update(this.client).subscribe();
                });

                this.subscribeToSaveResponse(this.recouvrementService.update(this.recouvrement));
            });
        } else {
            this.clientService.find(this.recouvrement.vente.client.id).subscribe((data: HttpResponse<IClient>) => {
                this.client = data.body;
                const montantRestant = this.vente.montantRestant - this.recouvrement.montant;
                if (montantRestant < 0) {
                    this.supMontRest = true;
                    this.isSaving = false;
                    return;
                } else {
                    this.vente.montantRestant = montantRestant;
                }
                this.client.montantRestant -= this.recouvrement.montant;
                this.clientService.update(this.client).subscribe();
                this.venteService.update(this.vente).subscribe();
                this.subscribeToSaveResponse(this.recouvrementService.create(this.recouvrement));
            });
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
