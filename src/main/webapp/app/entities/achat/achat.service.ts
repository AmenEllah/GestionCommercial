import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAchat } from 'app/shared/model/achat.model';

type EntityResponseType = HttpResponse<IAchat>;
type EntityArrayResponseType = HttpResponse<IAchat[]>;

@Injectable({ providedIn: 'root' })
export class AchatService {
    private resourceUrl = SERVER_API_URL + 'api/achats';

    constructor(private http: HttpClient) {}

    create(achat: IAchat): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(achat);
        return this.http
            .post<IAchat>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(achat: IAchat): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(achat);
        return this.http
            .put<IAchat>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IAchat>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IAchat[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(achat: IAchat): IAchat {
        const copy: IAchat = Object.assign({}, achat, {
            dateAchat: achat.dateAchat != null && achat.dateAchat.isValid() ? achat.dateAchat.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateAchat = res.body.dateAchat != null ? moment(res.body.dateAchat) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((achat: IAchat) => {
            achat.dateAchat = achat.dateAchat != null ? moment(achat.dateAchat) : null;
        });
        return res;
    }
}
