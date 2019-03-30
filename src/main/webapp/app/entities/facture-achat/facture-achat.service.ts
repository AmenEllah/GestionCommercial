import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFactureAchat } from 'app/shared/model/facture-achat.model';

type EntityResponseType = HttpResponse<IFactureAchat>;
type EntityArrayResponseType = HttpResponse<IFactureAchat[]>;

@Injectable({ providedIn: 'root' })
export class FactureAchatService {
    private resourceUrl = SERVER_API_URL + 'api/facture-achats';

    constructor(private http: HttpClient) {}

    create(factureAchat: IFactureAchat): Observable<EntityResponseType> {
        return this.http.post<IFactureAchat>(this.resourceUrl, factureAchat, { observe: 'response' });
    }

    update(factureAchat: IFactureAchat): Observable<EntityResponseType> {
        return this.http.put<IFactureAchat>(this.resourceUrl, factureAchat, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFactureAchat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFactureAchat[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
