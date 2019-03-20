import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from './article.service';
import { IFamille } from 'app/shared/model/famille.model';
import { FamilleService } from 'app/entities/famille';

@Component({
    selector: 'jhi-article-update',
    templateUrl: './article-update.component.html'
})
export class ArticleUpdateComponent implements OnInit {
    private _article: IArticle;
    isSaving: boolean;

    familles: IFamille[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private articleService: ArticleService,
        private familleService: FamilleService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ article }) => {
            this.article = article;
        });
        this.familleService.query().subscribe(
            (res: HttpResponse<IFamille[]>) => {
                this.familles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.article.totalAchat = 0;
        this.article.totalVente = 0;
        if (this.article.id !== undefined) {
            this.subscribeToSaveResponse(this.articleService.update(this.article));
        } else {
            this.subscribeToSaveResponse(this.articleService.create(this.article));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IArticle>>) {
        result.subscribe((res: HttpResponse<IArticle>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFamilleById(index: number, item: IFamille) {
        return item.id;
    }
    get article() {
        return this._article;
    }

    set article(article: IArticle) {
        this._article = article;
    }
}
