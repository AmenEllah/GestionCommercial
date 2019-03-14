import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVente } from 'app/shared/model/vente.model';

type EntityResponseType = HttpResponse<IVente>;
type EntityArrayResponseType = HttpResponse<IVente[]>;

@Injectable({ providedIn: 'root' })
export class VenteService {
    private resourceUrl = SERVER_API_URL + 'api/ventes';

    constructor(private http: HttpClient) {}

    create(vente: IVente): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(vente);
        return this.http
            .post<IVente>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(vente: IVente): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(vente);
        return this.http
            .put<IVente>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IVente>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IVente[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(vente: IVente): IVente {
        const copy: IVente = Object.assign({}, vente, {
            dateVente: vente.dateVente != null && vente.dateVente.isValid() ? vente.dateVente.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateVente = res.body.dateVente != null ? moment(res.body.dateVente) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((vente: IVente) => {
            vente.dateVente = vente.dateVente != null ? moment(vente.dateVente) : null;
        });
        return res;
    }
}
