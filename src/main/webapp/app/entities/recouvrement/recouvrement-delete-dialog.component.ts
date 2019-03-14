import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRecouvrement } from 'app/shared/model/recouvrement.model';
import { RecouvrementService } from './recouvrement.service';

@Component({
    selector: 'jhi-recouvrement-delete-dialog',
    templateUrl: './recouvrement-delete-dialog.component.html'
})
export class RecouvrementDeleteDialogComponent {
    recouvrement: IRecouvrement;

    constructor(
        private recouvrementService: RecouvrementService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.recouvrementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'recouvrementListModification',
                content: 'Deleted an recouvrement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-recouvrement-delete-popup',
    template: ''
})
export class RecouvrementDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ recouvrement }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RecouvrementDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.recouvrement = recouvrement;
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
