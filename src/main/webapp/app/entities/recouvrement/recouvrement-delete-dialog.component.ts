import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRecouvrement } from 'app/shared/model/recouvrement.model';
import { RecouvrementService } from './recouvrement.service';
import { HttpResponse } from '@angular/common/http';
import { ClientService } from '../client';
import { VenteService } from '../vente';
import { IVente } from 'app/shared/model/vente.model';
import { IClient } from 'app/shared/model/client.model';

@Component({
    selector: 'jhi-recouvrement-delete-dialog',
    templateUrl: './recouvrement-delete-dialog.component.html'
})
export class RecouvrementDeleteDialogComponent {
    recouvrement: IRecouvrement;
    client: IClient;

    constructor(
        private recouvrementService: RecouvrementService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private venteService: VenteService,
        private clientService: ClientService
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.recouvrementService.find(id).subscribe((data: HttpResponse<IRecouvrement>) => {
            this.venteService.find(data.body.vente.id).subscribe((datavente: HttpResponse<IVente>) => {
                datavente.body.montantRestant += data.body.montant;
                this.venteService.update(datavente.body).subscribe();

                this.clientService.find(this.recouvrement.vente.client.id).subscribe((dataFour: HttpResponse<IClient>) => {
                    this.client = dataFour.body;
                    this.client.montantRestant += this.recouvrement.montant;
                    this.clientService.update(this.client).subscribe();
                });
            });
        });

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
