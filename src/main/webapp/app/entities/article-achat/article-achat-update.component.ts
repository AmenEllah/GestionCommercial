import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IArticleAchat } from 'app/shared/model/article-achat.model';
import { ArticleAchatService } from './article-achat.service';
import { IAchat } from 'app/shared/model/achat.model';
import { AchatService } from 'app/entities/achat';
import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from 'app/entities/article';
import { FournisseurService } from '../fournisseur';
import { IFournisseur } from 'app/shared/model/fournisseur.model';

@Component({
    selector: 'jhi-article-achat-update',
    templateUrl: './article-achat-update.component.html'
})
export class ArticleAchatUpdateComponent implements OnInit {
    private _articleAchat: IArticleAchat;
    isSaving: boolean;

    achats: IAchat[];

    articles: IArticle[];
    achat: IAchat;
    ancienQuantite: number;
    id: number;
    new: boolean;
    ancienMontant: number;

    constructor(
        private jhiAlertService: JhiAlertService,
        private articleAchatService: ArticleAchatService,
        private achatService: AchatService,
        private articleService: ArticleService,
        private activatedRoute: ActivatedRoute,
        private fournisseurService: FournisseurService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.new = true;

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
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = +params['idA'];
            if (this.id) {
                this.achatService.find(this.id).subscribe((res: HttpResponse<IAchat>) => {
                    this.achat = res.body;
                    this.articleAchat.achat = this.achat;
                    this.new = false;
                });
            }
        });

        this.ancienQuantite = this.articleAchat.quantite;
        this.ancienMontant = this.articleAchat.quantite * this.articleAchat.article.prix;
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;

        if (this.articleAchat.id !== undefined) {
            //update
            this.articleService.find(this.articleAchat.article.id).subscribe((data: HttpResponse<IArticle>) => {
                data.body.totalAchat += this.articleAchat.quantite - this.ancienQuantite;
                this.articleService.update(data.body).subscribe();
            });
            this.achatService.find(this.articleAchat.achat.id).subscribe((data: HttpResponse<IAchat>) => {
                this.achat = data.body;
                this.achat.montantRestant += this.articleAchat.quantite * this.articleAchat.article.prix - this.ancienMontant;
                this.achat.totalPrix += this.articleAchat.quantite * this.articleAchat.article.prix - this.ancienMontant;

                this.fournisseurService.find(this.achat.fournisseur.id).subscribe((dataFournisseur: HttpResponse<IFournisseur>) => {
                    dataFournisseur.body.montantRestant += this.articleAchat.quantite * this.articleAchat.article.prix - this.ancienMontant;
                    this.fournisseurService.update(dataFournisseur.body).subscribe();
                });

                this.achatService.update(this.achat).subscribe();
            });

            this.subscribeToSaveResponse(this.articleAchatService.update(this.articleAchat));
        } else {
            // create
            this.articleService.find(this.articleAchat.article.id).subscribe((data: HttpResponse<IArticle>) => {
                data.body.totalAchat += this.articleAchat.quantite;
                this.articleService.update(data.body).subscribe();
            });
            this.achat.totalPrix += this.articleAchat.quantite * this.articleAchat.article.prix;

            this.achat.montantRestant += this.articleAchat.quantite * this.articleAchat.article.prix;
            this.fournisseurService.find(this.achat.fournisseur.id).subscribe((data: HttpResponse<IFournisseur>) => {
                data.body.montantRestant += this.articleAchat.quantite * this.articleAchat.article.prix;
                this.fournisseurService.update(data.body).subscribe();
            });
            this.achatService.update(this.achat).subscribe();
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
