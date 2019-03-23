import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IVente } from 'app/shared/model/vente.model';
import { VenteService } from './vente.service';
import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from 'app/entities/article';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from 'app/entities/client';

@Component({
    selector: 'jhi-vente-update',
    templateUrl: './vente-update.component.html'
})
export class VenteUpdateComponent implements OnInit {
    private _vente: IVente;
    isSaving: boolean;

    articles: IArticle[];

    clients: IClient[];
    dateVenteDp: any;
    totalPrixAncien: number;

    constructor(
        private jhiAlertService: JhiAlertService,
        private venteService: VenteService,
        private articleService: ArticleService,
        private clientService: ClientService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ vente }) => {
            this.vente = vente;
        });
        this.articleService.query().subscribe(
            (res: HttpResponse<IArticle[]>) => {
                this.articles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.clientService.query().subscribe(
            (res: HttpResponse<IClient[]>) => {
                this.clients = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.vente.totalPrix = this.vente.quantite * this.vente.article.prix;

        this.articleService.find(this.vente.article.id).subscribe((data: HttpResponse<IArticle>) => {
            data.body.totalVente += this.vente.quantite;
            this.articleService.update(data.body).subscribe();
        });

        if (this.vente.id !== undefined) {
            this.vente.montantRestant = this.vente.totalPrix;
            this.clientService.find(this.vente.client.id).subscribe((data: HttpResponse<IClient>) => {
                data.body.montantRestant += this.vente.totalPrix - this.totalPrixAncien;
                this.clientService.update(data.body).subscribe();
            });
            this.subscribeToSaveResponse(this.venteService.update(this.vente));
        } else {
            this.vente.montantRestant = this.vente.totalPrix;
            this.clientService.find(this.vente.client.id).subscribe((data: HttpResponse<IClient>) => {
                data.body.montantRestant += this.vente.totalPrix;
                this.clientService.update(data.body).subscribe();
            });
            this.subscribeToSaveResponse(this.venteService.create(this.vente));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IVente>>) {
        result.subscribe((res: HttpResponse<IVente>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackArticleById(index: number, item: IArticle) {
        return item.id;
    }

    trackClientById(index: number, item: IClient) {
        return item.id;
    }
    get vente() {
        return this._vente;
    }

    set vente(vente: IVente) {
        this._vente = vente;
    }
}
