import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionSharedModule } from 'app/shared';
import { InvoiceComponent } from './invoice.component';
import { invoiceRoute } from './invoice.route';

const ENTITY_STATES = [...invoiceRoute];

@NgModule({
    imports: [GestionSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [InvoiceComponent],
    entryComponents: [InvoiceComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionInvoiceModule {}
