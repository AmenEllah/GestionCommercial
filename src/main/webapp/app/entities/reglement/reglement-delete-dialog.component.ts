import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReglement } from 'app/shared/model/reglement.model';
import { ReglementService } from './reglement.service';
import { AchatService } from '../achat';
import { FournisseurService } from '../fournisseur';
import { HttpResponse } from '@angular/common/http';
import { IAchat } from 'app/shared/model/achat.model';
import { IFournisseur } from 'app/shared/model/fournisseur.model';

@Component({
    selector: 'jhi-reglement-delete-dialog',
    templateUrl: './reglement-delete-dialog.component.html'
})
export class ReglementDeleteDialogComponent {
    reglement: IReglement;
    fournisseur: IFournisseur;

    constructor(
        private reglementService: ReglementService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager,
        private achatService: AchatService,
        private fournisseurService: FournisseurService
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.reglementService.find(id).subscribe((data: HttpResponse<IReglement>) => {
            this.achatService.find(data.body.achat.id).subscribe((dataAchat: HttpResponse<IAchat>) => {
                dataAchat.body.montantRestant += data.body.montant;
                this.achatService.update(dataAchat.body).subscribe();

                this.fournisseurService.find(this.reglement.achat.fournisseur.id).subscribe((dataFour: HttpResponse<IFournisseur>) => {
                    this.fournisseur = dataFour.body;
                    this.fournisseur.montantRestant += this.reglement.montant;
                    this.fournisseurService.update(this.fournisseur).subscribe();
                });
            });
        });
        this.reglementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'reglementListModification',
                content: 'Deleted an reglement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-reglement-delete-popup',
    template: ''
})
export class ReglementDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ reglement }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ReglementDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.reglement = reglement;
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
