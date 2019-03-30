import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFactureAchat } from 'app/shared/model/facture-achat.model';
import { FactureAchatService } from './facture-achat.service';

@Component({
    selector: 'jhi-facture-achat-delete-dialog',
    templateUrl: './facture-achat-delete-dialog.component.html'
})
export class FactureAchatDeleteDialogComponent {
    factureAchat: IFactureAchat;

    constructor(
        private factureAchatService: FactureAchatService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.factureAchatService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'factureAchatListModification',
                content: 'Deleted an factureAchat'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-facture-achat-delete-popup',
    template: ''
})
export class FactureAchatDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ factureAchat }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FactureAchatDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.factureAchat = factureAchat;
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
