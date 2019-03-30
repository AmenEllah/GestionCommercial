import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionSharedModule } from 'app/shared';
import {
    FactureVenteComponent,
    FactureVenteDetailComponent,
    FactureVenteUpdateComponent,
    FactureVenteDeletePopupComponent,
    FactureVenteDeleteDialogComponent,
    factureVenteRoute,
    factureVentePopupRoute
} from './';

const ENTITY_STATES = [...factureVenteRoute, ...factureVentePopupRoute];

@NgModule({
    imports: [GestionSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FactureVenteComponent,
        FactureVenteDetailComponent,
        FactureVenteUpdateComponent,
        FactureVenteDeleteDialogComponent,
        FactureVenteDeletePopupComponent
    ],
    entryComponents: [
        FactureVenteComponent,
        FactureVenteUpdateComponent,
        FactureVenteDeleteDialogComponent,
        FactureVenteDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionFactureVenteModule {}
