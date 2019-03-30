import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionSharedModule } from 'app/shared';
import {
    ArticleVenteComponent,
    ArticleVenteDetailComponent,
    ArticleVenteUpdateComponent,
    ArticleVenteDeletePopupComponent,
    ArticleVenteDeleteDialogComponent,
    articleVenteRoute,
    articleVentePopupRoute
} from './';

const ENTITY_STATES = [...articleVenteRoute, ...articleVentePopupRoute];

@NgModule({
    imports: [GestionSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ArticleVenteComponent,
        ArticleVenteDetailComponent,
        ArticleVenteUpdateComponent,
        ArticleVenteDeleteDialogComponent,
        ArticleVenteDeletePopupComponent
    ],
    entryComponents: [
        ArticleVenteComponent,
        ArticleVenteUpdateComponent,
        ArticleVenteDeleteDialogComponent,
        ArticleVenteDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionArticleVenteModule {}
