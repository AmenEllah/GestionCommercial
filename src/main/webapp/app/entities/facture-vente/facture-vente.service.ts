import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFactureVente } from 'app/shared/model/facture-vente.model';

type EntityResponseType = HttpResponse<IFactureVente>;
type EntityArrayResponseType = HttpResponse<IFactureVente[]>;

@Injectable({ providedIn: 'root' })
export class FactureVenteService {
    private resourceUrl = SERVER_API_URL + 'api/facture-ventes';

    constructor(private http: HttpClient) {}

    create(factureVente: IFactureVente): Observable<EntityResponseType> {
        return this.http.post<IFactureVente>(this.resourceUrl, factureVente, { observe: 'response' });
    }

    update(factureVente: IFactureVente): Observable<EntityResponseType> {
        return this.http.put<IFactureVente>(this.resourceUrl, factureVente, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFactureVente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFactureVente[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
