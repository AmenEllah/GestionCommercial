import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IArticleVente } from 'app/shared/model/article-vente.model';
import { ArticleVenteService } from './article-vente.service';
import { IVente } from 'app/shared/model/vente.model';
import { VenteService } from 'app/entities/vente';
import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from 'app/entities/article';

@Component({
    selector: 'jhi-article-vente-update',
    templateUrl: './article-vente-update.component.html'
})
export class ArticleVenteUpdateComponent implements OnInit {
    private _articleVente: IArticleVente;
    isSaving: boolean;

    ventes: IVente[];

    articles: IArticle[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private articleVenteService: ArticleVenteService,
        private venteService: VenteService,
        private articleService: ArticleService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ articleVente }) => {
            this.articleVente = articleVente;
        });
        this.venteService.query().subscribe(
            (res: HttpResponse<IVente[]>) => {
                this.ventes = res.body;
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
        if (this.articleVente.id !== undefined) {
            this.subscribeToSaveResponse(this.articleVenteService.update(this.articleVente));
        } else {
            this.subscribeToSaveResponse(this.articleVenteService.create(this.articleVente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IArticleVente>>) {
        result.subscribe((res: HttpResponse<IArticleVente>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackVenteById(index: number, item: IVente) {
        return item.id;
    }

    trackArticleById(index: number, item: IArticle) {
        return item.id;
    }
    get articleVente() {
        return this._articleVente;
    }

    set articleVente(articleVente: IArticleVente) {
        this._articleVente = articleVente;
    }
}
