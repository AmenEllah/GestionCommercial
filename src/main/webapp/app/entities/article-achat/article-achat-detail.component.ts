import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IArticleAchat } from 'app/shared/model/article-achat.model';

@Component({
    selector: 'jhi-article-achat-detail',
    templateUrl: './article-achat-detail.component.html'
})
export class ArticleAchatDetailComponent implements OnInit {
    articleAchat: IArticleAchat;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ articleAchat }) => {
            this.articleAchat = articleAchat;
        });
    }

    previousState() {
        window.history.back();
    }
}
