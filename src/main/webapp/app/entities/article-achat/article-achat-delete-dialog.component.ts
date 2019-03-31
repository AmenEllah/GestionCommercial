import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArticleAchat } from 'app/shared/model/article-achat.model';
import { ArticleAchatService } from './article-achat.service';
import { ArticleService } from '../article/article.service';
import { AchatService } from '../achat';
import { HttpResponse } from '@angular/common/http';
import { IAchat } from 'app/shared/model/achat.model';
import { IArticle } from 'app/shared/model/article.model';
import { FournisseurService } from '../fournisseur';
import { IFournisseur } from 'app/shared/model/fournisseur.model';

@Component({
    selector: 'jhi-article-achat-delete-dialog',
    templateUrl: './article-achat-delete-dialog.component.html'
})
export class ArticleAchatDeleteDialogComponent {
    articleAchat: IArticleAchat;

    constructor(
        private articleAchatService: ArticleAchatService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private articleService: ArticleService,
        private achatService: AchatService,
        private fournisseurService: FournisseurService
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.articleAchatService.find(id).subscribe((data: HttpResponse<IArticleAchat>) => {
            this.articleService.find(data.body.article.id).subscribe((dataArticle: HttpResponse<IArticle>) => {
                dataArticle.body.totalAchat = dataArticle.body.totalAchat - data.body.quantite;
                this.articleService.update(dataArticle.body).subscribe();
            });

            this.achatService.find(data.body.achat.id).subscribe((dataAchat: HttpResponse<IAchat>) => {
                dataAchat.body.montantRestant -= data.body.quantite * data.body.article.prix;
                dataAchat.body.totalPrix -= data.body.quantite * data.body.article.prix;
                this.achatService.update(dataAchat.body).subscribe();
            });

            this.fournisseurService.find(data.body.achat.fournisseur.id).subscribe((dataFournisseur: HttpResponse<IFournisseur>) => {
                dataFournisseur.body.montantRestant -= data.body.quantite * data.body.article.prix;
                this.fournisseurService.update(dataFournisseur.body).subscribe();
            });
        });
        this.articleAchatService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'articleAchatListModification',
                content: 'Deleted an articleAchat'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-article-achat-delete-popup',
    template: ''
})
export class ArticleAchatDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ articleAchat }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ArticleAchatDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.articleAchat = articleAchat;
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
