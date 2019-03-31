import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleAchat } from 'app/shared/model/article-achat.model';
import { ArticleAchatService } from './article-achat.service';
import { ArticleAchatComponent } from './article-achat.component';
import { ArticleAchatDetailComponent } from './article-achat-detail.component';
import { ArticleAchatUpdateComponent } from './article-achat-update.component';
import { ArticleAchatDeletePopupComponent } from './article-achat-delete-dialog.component';
import { IArticleAchat } from 'app/shared/model/article-achat.model';

@Injectable({ providedIn: 'root' })
export class ArticleAchatResolve implements Resolve<IArticleAchat> {
    constructor(private service: ArticleAchatService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((articleAchat: HttpResponse<ArticleAchat>) => articleAchat.body));
        }
        return of(new ArticleAchat());
    }
}

export const articleAchatRoute: Routes = [
    {
        path: 'article-achat',
        component: ArticleAchatComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.articleAchat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'article-achat/:id/view',
        component: ArticleAchatDetailComponent,
        resolve: {
            articleAchat: ArticleAchatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.articleAchat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'article-achat/new',
        component: ArticleAchatUpdateComponent,
        resolve: {
            articleAchat: ArticleAchatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.articleAchat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'article-achat/new/:idA',
        component: ArticleAchatUpdateComponent,
        resolve: {
            articleAchat: ArticleAchatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.articleAchat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'article-achat/:id/edit',
        component: ArticleAchatUpdateComponent,
        resolve: {
            articleAchat: ArticleAchatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.articleAchat.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const articleAchatPopupRoute: Routes = [
    {
        path: 'article-achat/:id/delete',
        component: ArticleAchatDeletePopupComponent,
        resolve: {
            articleAchat: ArticleAchatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.articleAchat.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
