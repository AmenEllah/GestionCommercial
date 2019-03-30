import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IArticleVente } from 'app/shared/model/article-vente.model';
import { Principal } from 'app/core';
import { ArticleVenteService } from './article-vente.service';

@Component({
    selector: 'jhi-article-vente',
    templateUrl: './article-vente.component.html'
})
export class ArticleVenteComponent implements OnInit, OnDestroy {
    articleVentes: IArticleVente[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private articleVenteService: ArticleVenteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.articleVenteService.query().subscribe(
            (res: HttpResponse<IArticleVente[]>) => {
                this.articleVentes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInArticleVentes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IArticleVente) {
        return item.id;
    }

    registerChangeInArticleVentes() {
        this.eventSubscriber = this.eventManager.subscribe('articleVenteListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
