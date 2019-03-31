import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFactureAchat } from 'app/shared/model/facture-achat.model';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { IArticleAchat } from 'app/shared/model/article-achat.model';
import { ArticleAchatService } from '../article-achat';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-facture-achat-detail',
    templateUrl: './facture-achat-detail.component.html'
})
export class FactureAchatDetailComponent implements OnInit {
    factureAchat: IFactureAchat;
    articleAchats: IArticleAchat[];
    sysDate: String;
    theDate: Date;

    constructor(private activatedRoute: ActivatedRoute, private articleAchatService: ArticleAchatService) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ factureAchat }) => {
            this.factureAchat = factureAchat;
        });
        this.articleAchatService.query().subscribe((data: HttpResponse<IArticleAchat[]>) => {
            this.articleAchats = data.body;
            this.articleAchats.filter(x => x.achat.id === this.factureAchat.achat.id);
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
            pdf.save('FactureAchat' + this.factureAchat.id + '.pdf'); // Generated PDF
        });
    }

    systemDate() {}
}
