import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IArticleVente } from 'app/shared/model/article-vente.model';
import { IVente } from 'app/shared/model/vente.model';
import { VenteService } from 'app/entities/vente';
import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from 'app/entities/article';
import { ClientService } from '../client';
import { IClient } from 'app/shared/model/client.model';
import { ArticleVenteService } from './article-vente.service';

@Component({
    selector: 'jhi-article-vente-update',
    templateUrl: './article-vente-update.component.html'
})
export class ArticleVenteUpdateComponent implements OnInit {
    private _articleVente: IArticleVente;
    isSaving: boolean;

    ventes: IVente[];

    articles: IArticle[];
    vente: IVente;
    ancienMontant: number;
    ancienQuantite: any;
    new: boolean;
    id: number;
    quantiteInsuffisante = false;

    constructor(
        private jhiAlertService: JhiAlertService,
        private articleVenteService: ArticleVenteService,
        private venteService: VenteService,
        private articleService: ArticleService,
        private activatedRoute: ActivatedRoute,
        private clientService: ClientService
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.new = true;

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

        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = +params['idA'];
            if (this.id) {
                this.venteService.find(this.id).subscribe((res: HttpResponse<IVente>) => {
                    this.vente = res.body;
                    this.articleVente.vente = this.vente;
                    this.new = false;
                });
            }
        });

        this.ancienQuantite = this.articleVente.quantite;
        this.ancienMontant = this.articleVente.quantite * this.articleVente.article.prix;
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;

        if (this.articleVente.id !== undefined) {
            this.articleService.find(this.articleVente.article.id).subscribe((data: HttpResponse<IArticle>) => {
                data.body.totalVente += this.articleVente.quantite - this.ancienQuantite;
                if (data.body.totalVente > data.body.totalAchat + data.body.stockInitiale) {
                    this.quantiteInsuffisante = true;
                    this.isSaving = false;
                    return;
                }
                this.articleService.update(data.body).subscribe();
            });
            this.venteService.find(this.articleVente.vente.id).subscribe((data: HttpResponse<IVente>) => {
                this.vente = data.body;
                this.vente.montantRestant += this.articleVente.quantite * this.articleVente.article.prix - this.ancienMontant;
                this.vente.totalPrix += this.articleVente.quantite * this.articleVente.article.prix - this.ancienMontant;

                this.clientService.find(this.vente.client.id).subscribe((dataclient: HttpResponse<IClient>) => {
                    dataclient.body.montantRestant += this.articleVente.quantite * this.articleVente.article.prix - this.ancienMontant;
                    this.clientService.update(dataclient.body).subscribe();
                });

                this.venteService.update(this.vente).subscribe();
            });

            this.subscribeToSaveResponse(this.articleVenteService.update(this.articleVente));
        } else {
            this.articleService.find(this.articleVente.article.id).subscribe((data: HttpResponse<IArticle>) => {
                data.body.totalVente += this.articleVente.quantite;
                if (data.body.totalVente > data.body.totalAchat + data.body.stockInitiale) {
                    this.quantiteInsuffisante = true;
                    this.isSaving = false;
                    return;
                }
                this.articleService.update(data.body).subscribe();
                this.vente.totalPrix += this.articleVente.quantite * this.articleVente.article.prix;

                this.vente.montantRestant += this.articleVente.quantite * this.articleVente.article.prix;
                this.clientService.find(this.vente.client.id).subscribe((client: HttpResponse<IClient>) => {
                    client.body.montantRestant += this.articleVente.quantite * this.articleVente.article.prix;
                    this.clientService.update(client.body).subscribe();
                });
                this.venteService.update(this.vente).subscribe();
                this.subscribeToSaveResponse(this.articleVenteService.create(this.articleVente));
            });
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
    change() {
        this.quantiteInsuffisante = false;
    }
}
