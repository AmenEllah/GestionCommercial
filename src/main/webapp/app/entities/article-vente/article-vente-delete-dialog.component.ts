import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArticleVente } from 'app/shared/model/article-vente.model';
import { ArticleVenteService } from './article-vente.service';
import { HttpResponse } from '@angular/common/http';
import { IClient } from 'app/shared/model/client.model';
import { ClientService } from '../client';
import { VenteService } from '../vente';
import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from '../article/article.service';
import { IVente } from 'app/shared/model/vente.model';

@Component({
    selector: 'jhi-article-vente-delete-dialog',
    templateUrl: './article-vente-delete-dialog.component.html'
})
export class ArticleVenteDeleteDialogComponent {
    articleVente: IArticleVente;

    constructor(
        private articleVenteService: ArticleVenteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private clientService: ClientService,
        private venteService: VenteService,
        private articleService: ArticleService
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.articleVenteService.find(id).subscribe((data: HttpResponse<IArticleVente>) => {
            this.articleService.find(data.body.article.id).subscribe((dataArticle: HttpResponse<IArticle>) => {
                dataArticle.body.totalVente = dataArticle.body.totalVente - data.body.quantite;
                this.articleService.update(dataArticle.body).subscribe();
            });

            this.venteService.find(data.body.vente.id).subscribe((datavente: HttpResponse<IVente>) => {
                datavente.body.montantRestant -= data.body.quantite * data.body.article.prix;
                datavente.body.totalPrix -= data.body.quantite * data.body.article.prix;
                this.venteService.update(datavente.body).subscribe();
            });

            this.clientService.find(data.body.vente.client.id).subscribe((dataclient: HttpResponse<IClient>) => {
                dataclient.body.montantRestant -= data.body.quantite * data.body.article.prix;
                this.clientService.update(dataclient.body).subscribe();
            });
        });

        this.articleVenteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'articleVenteListModification',
                content: 'Deleted an articleVente'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-article-vente-delete-popup',
    template: ''
})
export class ArticleVenteDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ articleVente }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ArticleVenteDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.articleVente = articleVente;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
