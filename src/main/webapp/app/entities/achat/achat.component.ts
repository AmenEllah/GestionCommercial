import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAchat } from 'app/shared/model/achat.model';
import { Principal } from 'app/core';
import { AchatService } from './achat.service';
import { ArticleAchatService } from '../article-achat';

@Component({
    selector: 'jhi-achat',
    templateUrl: './achat.component.html'
})
export class AchatComponent implements OnInit, OnDestroy {
    achats: IAchat[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private achatService: AchatService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
        private articleAchatService: ArticleAchatService
    ) {}

    loadAll() {
        this.achatService.query().subscribe(
            (res: HttpResponse<IAchat[]>) => {
                this.achats = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAchats();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAchat) {
        return item.id;
    }

    registerChangeInAchats() {
        this.eventSubscriber = this.eventManager.subscribe('achatListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
