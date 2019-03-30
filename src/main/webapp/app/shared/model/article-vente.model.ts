import { IVente } from 'app/shared/model/vente.model';
import { IArticle } from 'app/shared/model/article.model';

export interface IArticleVente {
    id?: number;
    quantite?: number;
    vente?: IVente;
    article?: IArticle;
}

export class ArticleVente implements IArticleVente {
    constructor(public id?: number, public quantite?: number, public vente?: IVente, public article?: IArticle) {}
}
