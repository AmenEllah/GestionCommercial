import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFactureVente } from 'app/shared/model/facture-vente.model';
import { FactureVenteService } from './facture-vente.service';

@Component({
    selector: 'jhi-facture-vente-delete-dialog',
    templateUrl: './facture-vente-delete-dialog.component.html'
})
export class FactureVenteDeleteDialogComponent {
    factureVente: IFactureVente;

    constructor(
        private factureVenteService: FactureVenteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.factureVenteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'factureVenteListModification',
                content: 'Deleted an factureVente'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-facture-vente-delete-popup',
    template: ''
})
export class FactureVenteDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ factureVente }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FactureVenteDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.factureVente = factureVente;
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
