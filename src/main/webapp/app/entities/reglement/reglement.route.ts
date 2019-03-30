import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reglement } from 'app/shared/model/reglement.model';
import { ReglementService } from './reglement.service';
import { ReglementComponent } from './reglement.component';
import { ReglementDetailComponent } from './reglement-detail.component';
import { ReglementUpdateComponent } from './reglement-update.component';
import { ReglementDeletePopupComponent } from './reglement-delete-dialog.component';
import { IReglement } from 'app/shared/model/reglement.model';

@Injectable({ providedIn: 'root' })
export class ReglementResolve implements Resolve<IReglement> {
    constructor(private service: ReglementService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((reglement: HttpResponse<Reglement>) => reglement.body));
        }
        return of(new Reglement());
    }
}

export const reglementRoute: Routes = [
    {
        path: 'reglement',
        component: ReglementComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.reglement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reglement/:id/view',
        component: ReglementDetailComponent,
        resolve: {
            reglement: ReglementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.reglement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reglement/new',
        component: ReglementUpdateComponent,
        resolve: {
            reglement: ReglementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.reglement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'reglement/:id/edit',
        component: ReglementUpdateComponent,
        resolve: {
            reglement: ReglementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.reglement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const reglementPopupRoute: Routes = [
    {
        path: 'reglement/:id/delete',
        component: ReglementDeletePopupComponent,
        resolve: {
            reglement: ReglementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.reglement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
