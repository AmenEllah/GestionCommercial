import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFactureVente } from 'app/shared/model/facture-vente.model';
import { FactureVenteService } from './facture-vente.service';
import { IVente } from 'app/shared/model/vente.model';
import { VenteService } from 'app/entities/vente';

@Component({
    selector: 'jhi-facture-vente-update',
    templateUrl: './facture-vente-update.component.html'
})
export class FactureVenteUpdateComponent implements OnInit {
    private _factureVente: IFactureVente;
    isSaving: boolean;

    ventes: IVente[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private factureVenteService: FactureVenteService,
        private venteService: VenteService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ factureVente }) => {
            this.factureVente = factureVente;
        });
        this.venteService.query({ filter: 'facturevente-is-null' }).subscribe(
            (res: HttpResponse<IVente[]>) => {
                if (!this.factureVente.vente || !this.factureVente.vente.id) {
                    this.ventes = res.body;
                } else {
                    this.venteService.find(this.factureVente.vente.id).subscribe(
                        (subRes: HttpResponse<IVente>) => {
                            this.ventes = [subRes.body].concat(res.body);
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
        if (this.factureVente.id !== undefined) {
            this.subscribeToSaveResponse(this.factureVenteService.update(this.factureVente));
        } else {
            this.subscribeToSaveResponse(this.factureVenteService.create(this.factureVente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFactureVente>>) {
        result.subscribe((res: HttpResponse<IFactureVente>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get factureVente() {
        return this._factureVente;
    }

    set factureVente(factureVente: IFactureVente) {
        this._factureVente = factureVente;
    }
}
