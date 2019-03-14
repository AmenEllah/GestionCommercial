import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GestionArticleModule } from './article/article.module';
import { GestionFamilleModule } from './famille/famille.module';
import { GestionFournisseurModule } from './fournisseur/fournisseur.module';
import { GestionClientModule } from './client/client.module';
import { GestionReglementModule } from './reglement/reglement.module';
import { GestionRecouvrementModule } from './recouvrement/recouvrement.module';
import { GestionAchatModule } from './achat/achat.module';
import { GestionVenteModule } from './vente/vente.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        GestionArticleModule,
        GestionFamilleModule,
        GestionFournisseurModule,
        GestionClientModule,
        GestionReglementModule,
        GestionRecouvrementModule,
        GestionAchatModule,
        GestionVenteModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEntityModule {}
