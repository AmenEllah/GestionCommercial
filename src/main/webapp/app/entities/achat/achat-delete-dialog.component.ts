import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAchat } from 'app/shared/model/achat.model';
import { AchatService } from './achat.service';
import { HttpResponse } from '@angular/common/http';
import { ArticleService } from '../article';
import { IArticle } from 'app/shared/model/article.model';

@Component({
    selector: 'jhi-achat-delete-dialog',
    templateUrl: './achat-delete-dialog.component.html'
})
export class AchatDeleteDialogComponent {
    achat: IAchat;

    constructor(
        private achatService: AchatService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private articleService: ArticleService
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.achatService.find(id).subscribe((data: HttpResponse<IAchat>) => {
            this.articleService.find(data.body.article.id).subscribe((dataArticle: HttpResponse<IArticle>) => {
                dataArticle.body.totalAchat = dataArticle.body.totalAchat - data.body.quantite;
                this.articleService.update(dataArticle.body).subscribe();
            });
        });
        this.achatService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'achatListModification',
                content: 'Deleted an achat'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-achat-delete-popup',
    template: ''
})
export class AchatDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ achat }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AchatDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.achat = achat;
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
