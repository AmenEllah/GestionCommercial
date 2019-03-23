import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vente } from 'app/shared/model/vente.model';
import { IVente } from 'app/shared/model/vente.model';
import { InvoiceComponent } from './invoice.component';

@Injectable({ providedIn: 'root' })
export class InvoiceResolve {
    constructor() {}
}

export const invoiceRoute: Routes = [
    {
        path: 'invoice',
        component: InvoiceComponent,
        data: {
            authorities: ['ROLE_USER']
        },
        canActivate: [UserRouteAccessService]
    }
];
