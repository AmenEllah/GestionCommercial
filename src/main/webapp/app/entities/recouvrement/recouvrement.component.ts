import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRecouvrement } from 'app/shared/model/recouvrement.model';
import { Principal } from 'app/core';
import { RecouvrementService } from './recouvrement.service';

@Component({
    selector: 'jhi-recouvrement',
    templateUrl: './recouvrement.component.html'
})
export class RecouvrementComponent implements OnInit, OnDestroy {
    recouvrements: IRecouvrement[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private recouvrementService: RecouvrementService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.recouvrementService.query().subscribe(
            (res: HttpResponse<IRecouvrement[]>) => {
                this.recouvrements = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRecouvrements();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRecouvrement) {
        return item.id;
    }

    registerChangeInRecouvrements() {
        this.eventSubscriber = this.eventManager.subscribe('recouvrementListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
