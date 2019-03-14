import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionSharedModule } from 'app/shared';
import {
    ReglementComponent,
    ReglementDetailComponent,
    ReglementUpdateComponent,
    ReglementDeletePopupComponent,
    ReglementDeleteDialogComponent,
    reglementRoute,
    reglementPopupRoute
} from './';

const ENTITY_STATES = [...reglementRoute, ...reglementPopupRoute];

@NgModule({
    imports: [GestionSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReglementComponent,
        ReglementDetailComponent,
        ReglementUpdateComponent,
        ReglementDeleteDialogComponent,
        ReglementDeletePopupComponent
    ],
    entryComponents: [ReglementComponent, ReglementUpdateComponent, ReglementDeleteDialogComponent, ReglementDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionReglementModule {}
