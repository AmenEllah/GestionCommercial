import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IVente } from 'app/shared/model/vente.model';
import { Principal } from 'app/core';
import { VenteService } from './vente.service';

@Component({
    selector: 'jhi-vente',
    templateUrl: './vente.component.html'
})
export class VenteComponent implements OnInit, OnDestroy {
    ventes: IVente[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private venteService: VenteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.venteService.query().subscribe(
            (res: HttpResponse<IVente[]>) => {
                this.ventes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInVentes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IVente) {
        return item.id;
    }

    registerChangeInVentes() {
        this.eventSubscriber = this.eventManager.subscribe('venteListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
