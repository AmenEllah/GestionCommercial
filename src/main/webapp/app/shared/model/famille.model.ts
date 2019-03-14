import { IArticle } from 'app/shared/model/article.model';

export interface IFamille {
    id?: number;
    libelle?: string;
    articles?: IArticle[];
}

export class Famille implements IFamille {
    constructor(public id?: number, public libelle?: string, public articles?: IArticle[]) {}
}
