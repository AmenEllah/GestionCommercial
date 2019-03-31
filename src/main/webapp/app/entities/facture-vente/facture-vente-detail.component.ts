import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFactureVente } from 'app/shared/model/facture-vente.model';
import { HttpResponse } from '@angular/common/http';
import { IArticleVente } from 'app/shared/model/article-vente.model';
import { ArticleVenteService } from '../article-vente';

import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
@Component({
    selector: 'jhi-facture-vente-detail',
    templateUrl: './facture-vente-detail.component.html'
})
export class FactureVenteDetailComponent implements OnInit {
    factureVente: IFactureVente;
    articleVentes: IArticleVente[];
    theDate: Date;
    sysDate: string;

    constructor(private activatedRoute: ActivatedRoute, private articleVenteService: ArticleVenteService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ factureVente }) => {
            this.factureVente = factureVente;
        });
        this.articleVenteService.query().subscribe((data: HttpResponse<IArticleVente[]>) => {
            this.articleVentes = data.body;
            this.articleVentes.filter(x => x.vente.id === this.factureVente.vente.id);
        });
        this.theDate = new Date();
        this.sysDate = this.theDate.toUTCString();
    }

    previousState() {
        window.history.back();
    }

    public downloadPDF() {
        const data = document.getElementById('content');
        html2canvas(data).then(canvas => {
            // Few necessary setting options
            const imgWidth = 208;
            const pageHeight = 295;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
            const position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
            pdf.save('FactureVente' + this.factureVente.id + '.pdf'); // Generated PDF
        });
    }
}
