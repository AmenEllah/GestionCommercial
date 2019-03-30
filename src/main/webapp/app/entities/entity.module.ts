import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GestionArticleModule } from './article/article.module';
import { GestionFamilleModule } from './famille/famille.module';
import { GestionFournisseurModule } from './fournisseur/fournisseur.module';
import { GestionClientModule } from './client/client.module';
import { GestionReglementModule } from './reglement/reglement.module';
import { GestionRecouvrementModule } from './recouvrement/recouvrement.module';
import { GestionAchatModule } from './achat/achat.module';
import { GestionVenteModule } from './vente/vente.module';
import { InvoiceComponent } from './invoice/invoice.component';
import { GestionInvoiceModule } from './invoice/invoice.module';
import { GestionFactureAchatModule } from './facture-achat/facture-achat.module';
import { GestionArticleVenteModule } from './article-vente/article-vente.module';
import { GestionArticleAchatModule } from './article-achat/article-achat.module';
import { GestionFactureVenteModule } from './facture-vente/facture-vente.module';
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
        GestionInvoiceModule,
        GestionFactureAchatModule,
        GestionArticleVenteModule,
        GestionArticleAchatModule,
        GestionFactureVenteModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEntityModule {}
