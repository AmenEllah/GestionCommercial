import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { FournisseurService } from './fournisseur.service';

@Component({
    selector: 'jhi-fournisseur-update',
    templateUrl: './fournisseur-update.component.html'
})
export class FournisseurUpdateComponent implements OnInit {
    private _fournisseur: IFournisseur;
    isSaving: boolean;

    constructor(private fournisseurService: FournisseurService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ fournisseur }) => {
            this.fournisseur = fournisseur;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.fournisseur.id !== undefined) {
            this.subscribeToSaveResponse(this.fournisseurService.update(this.fournisseur));
        } else {
            this.subscribeToSaveResponse(this.fournisseurService.create(this.fournisseur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFournisseur>>) {
        result.subscribe((res: HttpResponse<IFournisseur>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get fournisseur() {
        return this._fournisseur;
    }

    set fournisseur(fournisseur: IFournisseur) {
        this._fournisseur = fournisseur;
    }
}
