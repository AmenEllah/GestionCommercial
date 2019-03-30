import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IArticleAchat } from 'app/shared/model/article-achat.model';

type EntityResponseType = HttpResponse<IArticleAchat>;
type EntityArrayResponseType = HttpResponse<IArticleAchat[]>;

@Injectable({ providedIn: 'root' })
export class ArticleAchatService {
    private resourceUrl = SERVER_API_URL + 'api/article-achats';

    constructor(private http: HttpClient) {}

    create(articleAchat: IArticleAchat): Observable<EntityResponseType> {
        return this.http.post<IArticleAchat>(this.resourceUrl, articleAchat, { observe: 'response' });
    }

    update(articleAchat: IArticleAchat): Observable<EntityResponseType> {
        return this.http.put<IArticleAchat>(this.resourceUrl, articleAchat, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IArticleAchat>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IArticleAchat[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
