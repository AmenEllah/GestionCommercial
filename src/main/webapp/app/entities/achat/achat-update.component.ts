import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAchat } from 'app/shared/model/achat.model';
import { AchatService } from './achat.service';
import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from 'app/entities/article';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { FournisseurService } from 'app/entities/fournisseur';

@Component({
    selector: 'jhi-achat-update',
    templateUrl: './achat-update.component.html'
})
export class AchatUpdateComponent implements OnInit {
    private _achat: IAchat;
    isSaving: boolean;

    articles: IArticle[];

    fournisseurs: IFournisseur[];
    dateAchatDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private achatService: AchatService,
        private articleService: ArticleService,
        private fournisseurService: FournisseurService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ achat }) => {
            this.achat = achat;
        });
        this.articleService.query().subscribe(
            (res: HttpResponse<IArticle[]>) => {
                this.articles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.fournisseurService.query().subscribe(
            (res: HttpResponse<IFournisseur[]>) => {
                this.fournisseurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.achat.id !== undefined) {
            this.subscribeToSaveResponse(this.achatService.update(this.achat));
        } else {
            this.subscribeToSaveResponse(this.achatService.create(this.achat));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAchat>>) {
        result.subscribe((res: HttpResponse<IAchat>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFournisseurById(index: number, item: IFournisseur) {
        return item.id;
    }
    get achat() {
        return this._achat;
    }

    set achat(achat: IAchat) {
        this._achat = achat;
    }
}
