import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArticleVente } from 'app/shared/model/article-vente.model';
import { ArticleVenteService } from './article-vente.service';

@Component({
    selector: 'jhi-article-vente-delete-dialog',
    templateUrl: './article-vente-delete-dialog.component.html'
})
export class ArticleVenteDeleteDialogComponent {
    articleVente: IArticleVente;

    constructor(
        private articleVenteService: ArticleVenteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
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
