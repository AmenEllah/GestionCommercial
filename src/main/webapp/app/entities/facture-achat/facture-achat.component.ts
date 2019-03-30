import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFactureAchat } from 'app/shared/model/facture-achat.model';
import { Principal } from 'app/core';
import { FactureAchatService } from './facture-achat.service';

@Component({
    selector: 'jhi-facture-achat',
    templateUrl: './facture-achat.component.html'
})
export class FactureAchatComponent implements OnInit, OnDestroy {
    factureAchats: IFactureAchat[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private factureAchatService: FactureAchatService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.factureAchatService.query().subscribe(
            (res: HttpResponse<IFactureAchat[]>) => {
                this.factureAchats = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFactureAchats();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFactureAchat) {
        return item.id;
    }

    registerChangeInFactureAchats() {
        this.eventSubscriber = this.eventManager.subscribe('factureAchatListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
