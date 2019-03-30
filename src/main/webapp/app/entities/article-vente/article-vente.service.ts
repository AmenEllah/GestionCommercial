import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IArticleVente } from 'app/shared/model/article-vente.model';

type EntityResponseType = HttpResponse<IArticleVente>;
type EntityArrayResponseType = HttpResponse<IArticleVente[]>;

@Injectable({ providedIn: 'root' })
export class ArticleVenteService {
    private resourceUrl = SERVER_API_URL + 'api/article-ventes';

    constructor(private http: HttpClient) {}

    create(articleVente: IArticleVente): Observable<EntityResponseType> {
        return this.http.post<IArticleVente>(this.resourceUrl, articleVente, { observe: 'response' });
    }

    update(articleVente: IArticleVente): Observable<EntityResponseType> {
        return this.http.put<IArticleVente>(this.resourceUrl, articleVente, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IArticleVente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IArticleVente[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
