import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf';
@Component({
    selector: 'jhi-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    @ViewChild('content') content: ElementRef;
    public downloadPDF() {
        const doc = new jsPDF();

        const specialElementHandlers = {
            '#editor': function(element, renderer) {
                return true;
            }
        };

        const content = this.content.nativeElement;
        //html2canvas for css
        doc.fromHTML(content.innerHTML, 30, 15, {
            width: 190,
            elementHandlers: specialElementHandlers
        });

        doc.save('facture.pdf');
    }
}
