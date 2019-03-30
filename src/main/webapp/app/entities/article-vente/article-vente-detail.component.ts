import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IArticleVente } from 'app/shared/model/article-vente.model';

@Component({
    selector: 'jhi-article-vente-detail',
    templateUrl: './article-vente-detail.component.html'
})
export class ArticleVenteDetailComponent implements OnInit {
    articleVente: IArticleVente;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ articleVente }) => {
            this.articleVente = articleVente;
        });
    }

    previousState() {
        window.history.back();
    }
}
