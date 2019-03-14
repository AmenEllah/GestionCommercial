import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFamille } from 'app/shared/model/famille.model';

type EntityResponseType = HttpResponse<IFamille>;
type EntityArrayResponseType = HttpResponse<IFamille[]>;

@Injectable({ providedIn: 'root' })
export class FamilleService {
    private resourceUrl = SERVER_API_URL + 'api/familles';

    constructor(private http: HttpClient) {}

    create(famille: IFamille): Observable<EntityResponseType> {
        return this.http.post<IFamille>(this.resourceUrl, famille, { observe: 'response' });
    }

    update(famille: IFamille): Observable<EntityResponseType> {
        return this.http.put<IFamille>(this.resourceUrl, famille, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFamille>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFamille[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
