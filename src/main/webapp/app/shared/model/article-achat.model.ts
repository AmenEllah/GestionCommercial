import { IAchat } from 'app/shared/model/achat.model';
import { IArticle } from 'app/shared/model/article.model';

export interface IArticleAchat {
    id?: number;
    quantite?: number;
    achat?: IAchat;
    article?: IArticle;
}

export class ArticleAchat implements IArticleAchat {
    constructor(public id?: number, public quantite?: number, public achat?: IAchat, public article?: IArticle) {}
}
