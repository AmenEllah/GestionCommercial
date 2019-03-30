import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFactureVente } from 'app/shared/model/facture-vente.model';
import { Principal } from 'app/core';
import { FactureVenteService } from './facture-vente.service';

@Component({
    selector: 'jhi-facture-vente',
    templateUrl: './facture-vente.component.html'
})
export class FactureVenteComponent implements OnInit, OnDestroy {
    factureVentes: IFactureVente[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private factureVenteService: FactureVenteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.factureVenteService.query().subscribe(
            (res: HttpResponse<IFactureVente[]>) => {
                this.factureVentes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFactureVentes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFactureVente) {
        return item.id;
    }

    registerChangeInFactureVentes() {
        this.eventSubscriber = this.eventManager.subscribe('factureVenteListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
