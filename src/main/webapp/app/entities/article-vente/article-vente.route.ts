import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleVente } from 'app/shared/model/article-vente.model';
import { ArticleVenteService } from './article-vente.service';
import { ArticleVenteComponent } from './article-vente.component';
import { ArticleVenteDetailComponent } from './article-vente-detail.component';
import { ArticleVenteUpdateComponent } from './article-vente-update.component';
import { ArticleVenteDeletePopupComponent } from './article-vente-delete-dialog.component';
import { IArticleVente } from 'app/shared/model/article-vente.model';

@Injectable({ providedIn: 'root' })
export class ArticleVenteResolve implements Resolve<IArticleVente> {
    constructor(private service: ArticleVenteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((articleVente: HttpResponse<ArticleVente>) => articleVente.body));
        }
        return of(new ArticleVente());
    }
}

export const articleVenteRoute: Routes = [
    {
        path: 'article-vente',
        component: ArticleVenteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.articleVente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'article-vente/:id/view',
        component: ArticleVenteDetailComponent,
        resolve: {
            articleVente: ArticleVenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.articleVente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'article-vente/new',
        component: ArticleVenteUpdateComponent,
        resolve: {
            articleVente: ArticleVenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.articleVente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'article-vente/new/:idA',
        component: ArticleVenteUpdateComponent,
        resolve: {
            articleVente: ArticleVenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.articleVente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'article-vente/:id/edit',
        component: ArticleVenteUpdateComponent,
        resolve: {
            articleVente: ArticleVenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.articleVente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const articleVentePopupRoute: Routes = [
    {
        path: 'article-vente/:id/delete',
        component: ArticleVenteDeletePopupComponent,
        resolve: {
            articleVente: ArticleVenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.articleVente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
