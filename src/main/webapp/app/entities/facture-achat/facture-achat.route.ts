import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FactureAchat } from 'app/shared/model/facture-achat.model';
import { FactureAchatService } from './facture-achat.service';
import { FactureAchatComponent } from './facture-achat.component';
import { FactureAchatDetailComponent } from './facture-achat-detail.component';
import { FactureAchatUpdateComponent } from './facture-achat-update.component';
import { FactureAchatDeletePopupComponent } from './facture-achat-delete-dialog.component';
import { IFactureAchat } from 'app/shared/model/facture-achat.model';

@Injectable({ providedIn: 'root' })
export class FactureAchatResolve implements Resolve<IFactureAchat> {
    constructor(private service: FactureAchatService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((factureAchat: HttpResponse<FactureAchat>) => factureAchat.body));
        }
        return of(new FactureAchat());
    }
}

export const factureAchatRoute: Routes = [
    {
        path: 'facture-achat',
        component: FactureAchatComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.factureAchat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'facture-achat/:id/view',
        component: FactureAchatDetailComponent,
        resolve: {
            factureAchat: FactureAchatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.factureAchat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'facture-achat/new',
        component: FactureAchatUpdateComponent,
        resolve: {
            factureAchat: FactureAchatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.factureAchat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'facture-achat/:id/edit',
        component: FactureAchatUpdateComponent,
        resolve: {
            factureAchat: FactureAchatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.factureAchat.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const factureAchatPopupRoute: Routes = [
    {
        path: 'facture-achat/:id/delete',
        component: FactureAchatDeletePopupComponent,
        resolve: {
            factureAchat: FactureAchatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.factureAchat.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
