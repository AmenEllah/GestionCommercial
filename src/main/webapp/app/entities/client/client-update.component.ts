import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IClient } from 'app/shared/model/client.model';
import { ClientService } from './client.service';

@Component({
    selector: 'jhi-client-update',
    templateUrl: './client-update.component.html'
})
export class ClientUpdateComponent implements OnInit {
    private _client: IClient;
    isSaving: boolean;

    constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ client }) => {
            this.client = client;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.client.id !== undefined) {
            this.subscribeToSaveResponse(this.clientService.update(this.client));
        } else {
            this.subscribeToSaveResponse(this.clientService.create(this.client));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IClient>>) {
        result.subscribe((res: HttpResponse<IClient>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get client() {
        return this._client;
    }

    set client(client: IClient) {
        this._client = client;
    }
}
