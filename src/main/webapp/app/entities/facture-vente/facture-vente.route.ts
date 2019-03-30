import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FactureVente } from 'app/shared/model/facture-vente.model';
import { FactureVenteService } from './facture-vente.service';
import { FactureVenteComponent } from './facture-vente.component';
import { FactureVenteDetailComponent } from './facture-vente-detail.component';
import { FactureVenteUpdateComponent } from './facture-vente-update.component';
import { FactureVenteDeletePopupComponent } from './facture-vente-delete-dialog.component';
import { IFactureVente } from 'app/shared/model/facture-vente.model';

@Injectable({ providedIn: 'root' })
export class FactureVenteResolve implements Resolve<IFactureVente> {
    constructor(private service: FactureVenteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((factureVente: HttpResponse<FactureVente>) => factureVente.body));
        }
        return of(new FactureVente());
    }
}

export const factureVenteRoute: Routes = [
    {
        path: 'facture-vente',
        component: FactureVenteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.factureVente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'facture-vente/:id/view',
        component: FactureVenteDetailComponent,
        resolve: {
            factureVente: FactureVenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.factureVente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'facture-vente/new',
        component: FactureVenteUpdateComponent,
        resolve: {
            factureVente: FactureVenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.factureVente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'facture-vente/:id/edit',
        component: FactureVenteUpdateComponent,
        resolve: {
            factureVente: FactureVenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.factureVente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const factureVentePopupRoute: Routes = [
    {
        path: 'facture-vente/:id/delete',
        component: FactureVenteDeletePopupComponent,
        resolve: {
            factureVente: FactureVenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.factureVente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
