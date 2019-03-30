import { IArticleVente } from 'app/shared/model/article-vente.model';
import { IArticleAchat } from 'app/shared/model/article-achat.model';
import { IFamille } from 'app/shared/model/famille.model';

export interface IArticle {
    id?: number;
    code?: string;
    libelle?: string;
    tva?: number;
    unite?: string;
    prix?: number;
    totalVente?: number;
    totalAchat?: number;
    stockInitiale?: number;
    articleVentes?: IArticleVente[];
    articleAchats?: IArticleAchat[];
    famille?: IFamille;
}

export class Article implements IArticle {
    constructor(
        public id?: number,
        public code?: string,
        public libelle?: string,
        public tva?: number,
        public unite?: string,
        public prix?: number,
        public totalVente?: number,
        public totalAchat?: number,
        public stockInitiale?: number,
        public articleVentes?: IArticleVente[],
        public articleAchats?: IArticleAchat[],
        public famille?: IFamille
    ) {}
}
