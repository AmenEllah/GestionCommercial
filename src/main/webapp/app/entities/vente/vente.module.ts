import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionSharedModule } from 'app/shared';
import {
    VenteComponent,
    VenteDetailComponent,
    VenteUpdateComponent,
    VenteDeletePopupComponent,
    VenteDeleteDialogComponent,
    venteRoute,
    ventePopupRoute
} from './';

const ENTITY_STATES = [...venteRoute, ...ventePopupRoute];

@NgModule({
    imports: [GestionSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [VenteComponent, VenteDetailComponent, VenteUpdateComponent, VenteDeleteDialogComponent, VenteDeletePopupComponent],
    entryComponents: [VenteComponent, VenteUpdateComponent, VenteDeleteDialogComponent, VenteDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionVenteModule {}
