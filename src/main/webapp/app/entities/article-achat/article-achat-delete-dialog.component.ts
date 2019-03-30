import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArticleAchat } from 'app/shared/model/article-achat.model';
import { ArticleAchatService } from './article-achat.service';

@Component({
    selector: 'jhi-article-achat-delete-dialog',
    templateUrl: './article-achat-delete-dialog.component.html'
})
export class ArticleAchatDeleteDialogComponent {
    articleAchat: IArticleAchat;

    constructor(
        private articleAchatService: ArticleAchatService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
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
