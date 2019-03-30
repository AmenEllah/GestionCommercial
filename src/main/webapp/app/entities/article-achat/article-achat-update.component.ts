import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IArticleAchat } from 'app/shared/model/article-achat.model';
import { ArticleAchatService } from './article-achat.service';
import { IAchat } from 'app/shared/model/achat.model';
import { AchatService } from 'app/entities/achat';
import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from 'app/entities/article';

@Component({
    selector: 'jhi-article-achat-update',
    templateUrl: './article-achat-update.component.html'
})
export class ArticleAchatUpdateComponent implements OnInit {
    private _articleAchat: IArticleAchat;
    isSaving: boolean;

    achats: IAchat[];

    articles: IArticle[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private articleAchatService: ArticleAchatService,
        private achatService: AchatService,
        private articleService: ArticleService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ articleAchat }) => {
            this.articleAchat = articleAchat;
        });
        this.achatService.query().subscribe(
            (res: HttpResponse<IAchat[]>) => {
                this.achats = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.articleService.query().subscribe(
            (res: HttpResponse<IArticle[]>) => {
                this.articles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.articleAchat.id !== undefined) {
            this.subscribeToSaveResponse(this.articleAchatService.update(this.articleAchat));
        } else {
            this.subscribeToSaveResponse(this.articleAchatService.create(this.articleAchat));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IArticleAchat>>) {
        result.subscribe((res: HttpResponse<IArticleAchat>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAchatById(index: number, item: IAchat) {
        return item.id;
    }

    trackArticleById(index: number, item: IArticle) {
        return item.id;
    }
    get articleAchat() {
        return this._articleAchat;
    }

    set articleAchat(articleAchat: IArticleAchat) {
        this._articleAchat = articleAchat;
    }
}
