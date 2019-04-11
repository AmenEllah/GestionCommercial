import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVente } from 'app/shared/model/vente.model';
import { IArticleVente } from 'app/shared/model/article-vente.model';
import { ArticleVenteService } from '../article-vente';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-vente-detail',
    templateUrl: './vente-detail.component.html'
})
export class VenteDetailComponent implements OnInit {
    vente: IVente;
    articleVentes: IArticleVente[];

    constructor(private activatedRoute: ActivatedRoute, private articleVenteService: ArticleVenteService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ vente }) => {
            this.vente = vente;
        });
        this.articleVenteService.query().subscribe((data: HttpResponse<IArticleVente[]>) => {
            this.articleVentes = data.body;
            this.articleVentes.filter(x => x.vente.id === this.vente.id);
        });
    }

    previousState() {
        window.history.back();
    }
}
