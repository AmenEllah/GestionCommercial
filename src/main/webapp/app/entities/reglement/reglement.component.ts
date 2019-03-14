import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IReglement } from 'app/shared/model/reglement.model';
import { Principal } from 'app/core';
import { ReglementService } from './reglement.service';

@Component({
    selector: 'jhi-reglement',
    templateUrl: './reglement.component.html'
})
export class ReglementComponent implements OnInit, OnDestroy {
    reglements: IReglement[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private reglementService: ReglementService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.reglementService.query().subscribe(
            (res: HttpResponse<IReglement[]>) => {
                this.reglements = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInReglements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IReglement) {
        return item.id;
    }

    registerChangeInReglements() {
        this.eventSubscriber = this.eventManager.subscribe('reglementListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
