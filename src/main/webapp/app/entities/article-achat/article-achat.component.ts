import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IArticleAchat } from 'app/shared/model/article-achat.model';
import { Principal } from 'app/core';
import { ArticleAchatService } from './article-achat.service';

@Component({
    selector: 'jhi-article-achat',
    templateUrl: './article-achat.component.html'
})
export class ArticleAchatComponent implements OnInit, OnDestroy {
    articleAchats: IArticleAchat[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private articleAchatService: ArticleAchatService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.articleAchatService.query().subscribe(
            (res: HttpResponse<IArticleAchat[]>) => {
                this.articleAchats = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInArticleAchats();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IArticleAchat) {
        return item.id;
    }

    registerChangeInArticleAchats() {
        this.eventSubscriber = this.eventManager.subscribe('articleAchatListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
