import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionSharedModule } from 'app/shared';
import {
    RecouvrementComponent,
    RecouvrementDetailComponent,
    RecouvrementUpdateComponent,
    RecouvrementDeletePopupComponent,
    RecouvrementDeleteDialogComponent,
    recouvrementRoute,
    recouvrementPopupRoute
} from './';

const ENTITY_STATES = [...recouvrementRoute, ...recouvrementPopupRoute];

@NgModule({
    imports: [GestionSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RecouvrementComponent,
        RecouvrementDetailComponent,
        RecouvrementUpdateComponent,
        RecouvrementDeleteDialogComponent,
        RecouvrementDeletePopupComponent
    ],
    entryComponents: [
        RecouvrementComponent,
        RecouvrementUpdateComponent,
        RecouvrementDeleteDialogComponent,
        RecouvrementDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionRecouvrementModule {}
