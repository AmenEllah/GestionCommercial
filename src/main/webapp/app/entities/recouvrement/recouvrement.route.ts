import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recouvrement } from 'app/shared/model/recouvrement.model';
import { RecouvrementService } from './recouvrement.service';
import { RecouvrementComponent } from './recouvrement.component';
import { RecouvrementDetailComponent } from './recouvrement-detail.component';
import { RecouvrementUpdateComponent } from './recouvrement-update.component';
import { RecouvrementDeletePopupComponent } from './recouvrement-delete-dialog.component';
import { IRecouvrement } from 'app/shared/model/recouvrement.model';

@Injectable({ providedIn: 'root' })
export class RecouvrementResolve implements Resolve<IRecouvrement> {
    constructor(private service: RecouvrementService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((recouvrement: HttpResponse<Recouvrement>) => recouvrement.body));
        }
        return of(new Recouvrement());
    }
}

export const recouvrementRoute: Routes = [
    {
        path: 'recouvrement',
        component: RecouvrementComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.recouvrement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'recouvrement/:id/view',
        component: RecouvrementDetailComponent,
        resolve: {
            recouvrement: RecouvrementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.recouvrement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'recouvrement/new',
        component: RecouvrementUpdateComponent,
        resolve: {
            recouvrement: RecouvrementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.recouvrement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'recouvrement/new/:idR',
        component: RecouvrementUpdateComponent,
        resolve: {
            recouvrement: RecouvrementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.recouvrement.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'recouvrement/:id/edit',
        component: RecouvrementUpdateComponent,
        resolve: {
            recouvrement: RecouvrementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.recouvrement.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const recouvrementPopupRoute: Routes = [
    {
        path: 'recouvrement/:id/delete',
        component: RecouvrementDeletePopupComponent,
        resolve: {
            recouvrement: RecouvrementResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.recouvrement.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
