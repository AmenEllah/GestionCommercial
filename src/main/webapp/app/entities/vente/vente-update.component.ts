import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IVente } from 'app/shared/model/vente.model';
import { VenteService } from './vente.service';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client';
import { IFactureVente } from 'app/shared/model/facture-vente.model';
import { FactureVenteService } from 'app/entities/facture-vente';

@Component({
    selector: 'jhi-vente-update',
    templateUrl: './vente-update.component.html'
})
export class VenteUpdateComponent implements OnInit {
    private _vente: IVente;
    isSaving: boolean;

    clients: IClient[];

    factureventes: IFactureVente[];
    dateVenteDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private venteService: VenteService,
        private clientService: ClientService,
        private factureVenteService: FactureVenteService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vente }) => {
            this.vente = vente;
        });
        this.clientService.query().subscribe(
            (res: HttpResponse<IClient[]>) => {
                this.clients = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.factureVenteService.query().subscribe(
            (res: HttpResponse<IFactureVente[]>) => {
                this.factureventes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.vente.id !== undefined) {
            this.subscribeToSaveResponse(this.venteService.update(this.vente));
        } else {
            this.subscribeToSaveResponse(this.venteService.create(this.vente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVente>>) {
        result.subscribe((res: HttpResponse<IVente>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackClientById(index: number, item: IClient) {
        return item.id;
    }

    trackFactureVenteById(index: number, item: IFactureVente) {
        return item.id;
    }
    get vente() {
        return this._vente;
    }

    set vente(vente: IVente) {
        this._vente = vente;
    }
}
