import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFournisseur } from 'app/shared/model/fournisseur.model';

type EntityResponseType = HttpResponse<IFournisseur>;
type EntityArrayResponseType = HttpResponse<IFournisseur[]>;

@Injectable({ providedIn: 'root' })
export class FournisseurService {
    private resourceUrl = SERVER_API_URL + 'api/fournisseurs';

    constructor(private http: HttpClient) {}

    create(fournisseur: IFournisseur): Observable<EntityResponseType> {
        return this.http.post<IFournisseur>(this.resourceUrl, fournisseur, { observe: 'response' });
    }

    update(fournisseur: IFournisseur): Observable<EntityResponseType> {
        return this.http.put<IFournisseur>(this.resourceUrl, fournisseur, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFournisseur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFournisseur[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
