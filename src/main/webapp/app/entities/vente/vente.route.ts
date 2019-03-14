import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vente } from 'app/shared/model/vente.model';
import { VenteService } from './vente.service';
import { VenteComponent } from './vente.component';
import { VenteDetailComponent } from './vente-detail.component';
import { VenteUpdateComponent } from './vente-update.component';
import { VenteDeletePopupComponent } from './vente-delete-dialog.component';
import { IVente } from 'app/shared/model/vente.model';

@Injectable({ providedIn: 'root' })
export class VenteResolve implements Resolve<IVente> {
    constructor(private service: VenteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((vente: HttpResponse<Vente>) => vente.body));
        }
        return of(new Vente());
    }
}

export const venteRoute: Routes = [
    {
        path: 'vente',
        component: VenteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.vente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vente/:id/view',
        component: VenteDetailComponent,
        resolve: {
            vente: VenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.vente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vente/new',
        component: VenteUpdateComponent,
        resolve: {
            vente: VenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.vente.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'vente/:id/edit',
        component: VenteUpdateComponent,
        resolve: {
            vente: VenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.vente.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ventePopupRoute: Routes = [
    {
        path: 'vente/:id/delete',
        component: VenteDeletePopupComponent,
        resolve: {
            vente: VenteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.vente.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
