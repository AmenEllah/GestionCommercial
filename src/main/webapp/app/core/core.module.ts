import { NgModule, LOCALE_ID } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import locale from '@angular/common/locales/fr';

import { FindLanguageFromKeyPipe } from 'app/shared';
@NgModule({
    imports: [HttpClientModule],
    exports: [],
    declarations: [],
    providers: [
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'fr'
        },
        FindLanguageFromKeyPipe,
        DatePipe
    ]
})
export class GestionCoreModule {
    constructor() {
        registerLocaleData(locale);
    }
}
