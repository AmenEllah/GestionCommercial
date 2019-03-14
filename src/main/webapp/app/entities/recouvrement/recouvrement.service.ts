import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRecouvrement } from 'app/shared/model/recouvrement.model';

type EntityResponseType = HttpResponse<IRecouvrement>;
type EntityArrayResponseType = HttpResponse<IRecouvrement[]>;

@Injectable({ providedIn: 'root' })
export class RecouvrementService {
    private resourceUrl = SERVER_API_URL + 'api/recouvrements';

    constructor(private http: HttpClient) {}

    create(recouvrement: IRecouvrement): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(recouvrement);
        return this.http
            .post<IRecouvrement>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(recouvrement: IRecouvrement): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(recouvrement);
        return this.http
            .put<IRecouvrement>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IRecouvrement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IRecouvrement[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(recouvrement: IRecouvrement): IRecouvrement {
        const copy: IRecouvrement = Object.assign({}, recouvrement, {
            dateRec: recouvrement.dateRec != null && recouvrement.dateRec.isValid() ? recouvrement.dateRec.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.dateRec = res.body.dateRec != null ? moment(res.body.dateRec) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((recouvrement: IRecouvrement) => {
            recouvrement.dateRec = recouvrement.dateRec != null ? moment(recouvrement.dateRec) : null;
        });
        return res;
    }
}
