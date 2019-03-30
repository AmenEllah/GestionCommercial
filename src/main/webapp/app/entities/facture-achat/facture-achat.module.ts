import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionSharedModule } from 'app/shared';
import {
    FactureAchatComponent,
    FactureAchatDetailComponent,
    FactureAchatUpdateComponent,
    FactureAchatDeletePopupComponent,
    FactureAchatDeleteDialogComponent,
    factureAchatRoute,
    factureAchatPopupRoute
} from './';

const ENTITY_STATES = [...factureAchatRoute, ...factureAchatPopupRoute];

@NgModule({
    imports: [GestionSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FactureAchatComponent,
        FactureAchatDetailComponent,
        FactureAchatUpdateComponent,
        FactureAchatDeleteDialogComponent,
        FactureAchatDeletePopupComponent
    ],
    entryComponents: [
        FactureAchatComponent,
        FactureAchatUpdateComponent,
        FactureAchatDeleteDialogComponent,
        FactureAchatDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionFactureAchatModule {}
