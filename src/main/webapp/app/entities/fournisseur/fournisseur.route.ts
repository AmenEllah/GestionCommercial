import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Fournisseur } from 'app/shared/model/fournisseur.model';
import { FournisseurService } from './fournisseur.service';
import { FournisseurComponent } from './fournisseur.component';
import { FournisseurDetailComponent } from './fournisseur-detail.component';
import { FournisseurUpdateComponent } from './fournisseur-update.component';
import { FournisseurDeletePopupComponent } from './fournisseur-delete-dialog.component';
import { IFournisseur } from 'app/shared/model/fournisseur.model';

@Injectable({ providedIn: 'root' })
export class FournisseurResolve implements Resolve<IFournisseur> {
    constructor(private service: FournisseurService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((fournisseur: HttpResponse<Fournisseur>) => fournisseur.body));
        }
        return of(new Fournisseur());
    }
}

export const fournisseurRoute: Routes = [
    {
        path: 'fournisseur',
        component: FournisseurComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.fournisseur.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fournisseur/:id/view',
        component: FournisseurDetailComponent,
        resolve: {
            fournisseur: FournisseurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.fournisseur.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fournisseur/new',
        component: FournisseurUpdateComponent,
        resolve: {
            fournisseur: FournisseurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.fournisseur.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'fournisseur/:id/edit',
        component: FournisseurUpdateComponent,
        resolve: {
            fournisseur: FournisseurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.fournisseur.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const fournisseurPopupRoute: Routes = [
    {
        path: 'fournisseur/:id/delete',
        component: FournisseurDeletePopupComponent,
        resolve: {
            fournisseur: FournisseurResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.fournisseur.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
