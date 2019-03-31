import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAchat } from 'app/shared/model/achat.model';
import { ArticleAchatService } from '../article-achat';
import { IArticleAchat } from 'app/shared/model/article-achat.model';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-achat-detail',
    templateUrl: './achat-detail.component.html'
})
export class AchatDetailComponent implements OnInit {
    achat: IAchat;
    articleAchats: IArticleAchat[];

    constructor(private activatedRoute: ActivatedRoute, private articleAchatService: ArticleAchatService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ achat }) => {
            this.achat = achat;
        });
        this.articleAchatService.query().subscribe((data: HttpResponse<IArticleAchat[]>) => {
            this.articleAchats = data.body;
            this.articleAchats.filter(x => x.achat.id === this.achat.id);
        });
    }

    previousState() {
        window.history.back();
    }
}
