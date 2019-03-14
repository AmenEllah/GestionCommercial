import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Achat } from 'app/shared/model/achat.model';
import { AchatService } from './achat.service';
import { AchatComponent } from './achat.component';
import { AchatDetailComponent } from './achat-detail.component';
import { AchatUpdateComponent } from './achat-update.component';
import { AchatDeletePopupComponent } from './achat-delete-dialog.component';
import { IAchat } from 'app/shared/model/achat.model';

@Injectable({ providedIn: 'root' })
export class AchatResolve implements Resolve<IAchat> {
    constructor(private service: AchatService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((achat: HttpResponse<Achat>) => achat.body));
        }
        return of(new Achat());
    }
}

export const achatRoute: Routes = [
    {
        path: 'achat',
        component: AchatComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.achat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'achat/:id/view',
        component: AchatDetailComponent,
        resolve: {
            achat: AchatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.achat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'achat/new',
        component: AchatUpdateComponent,
        resolve: {
            achat: AchatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.achat.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'achat/:id/edit',
        component: AchatUpdateComponent,
        resolve: {
            achat: AchatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.achat.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const achatPopupRoute: Routes = [
    {
        path: 'achat/:id/delete',
        component: AchatDeletePopupComponent,
        resolve: {
            achat: AchatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'gestionApp.achat.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
