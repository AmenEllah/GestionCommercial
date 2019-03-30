import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionSharedModule } from 'app/shared';
import {
    ArticleAchatComponent,
    ArticleAchatDetailComponent,
    ArticleAchatUpdateComponent,
    ArticleAchatDeletePopupComponent,
    ArticleAchatDeleteDialogComponent,
    articleAchatRoute,
    articleAchatPopupRoute
} from './';

const ENTITY_STATES = [...articleAchatRoute, ...articleAchatPopupRoute];

@NgModule({
    imports: [GestionSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ArticleAchatComponent,
        ArticleAchatDetailComponent,
        ArticleAchatUpdateComponent,
        ArticleAchatDeleteDialogComponent,
        ArticleAchatDeletePopupComponent
    ],
    entryComponents: [
        ArticleAchatComponent,
        ArticleAchatUpdateComponent,
        ArticleAchatDeleteDialogComponent,
        ArticleAchatDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionArticleAchatModule {}
