import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionSharedModule } from 'app/shared';
import {
    AchatComponent,
    AchatDetailComponent,
    AchatUpdateComponent,
    AchatDeletePopupComponent,
    AchatDeleteDialogComponent,
    achatRoute,
    achatPopupRoute
} from './';

const ENTITY_STATES = [...achatRoute, ...achatPopupRoute];

@NgModule({
    imports: [GestionSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AchatComponent, AchatDetailComponent, AchatUpdateComponent, AchatDeleteDialogComponent, AchatDeletePopupComponent],
    entryComponents: [AchatComponent, AchatUpdateComponent, AchatDeleteDialogComponent, AchatDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionAchatModule {}
