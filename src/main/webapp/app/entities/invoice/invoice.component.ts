import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
@Component({
    selector: 'jhi-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
    @ViewChild('content') content: ElementRef;

    constructor() {}

    ngOnInit() {}

    public downloadPDF() {
        const doc = new jsPDF();

        const specialElementHandlers = {
            '#editor'(element, renderer) {
                return true;
            }
        };

        const content = this.content.nativeElement;
        doc.fromHTML(content.innerHTML, 30, 15, {
            width: 190,
            elementHandlers: specialElementHandlers
        });

        doc.save('facture.pdf');
    }
}
