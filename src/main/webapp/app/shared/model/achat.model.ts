import { Moment } from 'moment';
import { IReglement } from 'app/shared/model/reglement.model';
import { IArticle } from 'app/shared/model/article.model';
import { IFournisseur } from 'app/shared/model/fournisseur.model';

export interface IAchat {
    id?: number;
    quantite?: number;
    dateAchat?: Moment;
    totalPrix?: number;
    montantRestant?: number;
    reglements?: IReglement[];
    article?: IArticle;
    fournisseur?: IFournisseur;
}

export class Achat implements IAchat {
    constructor(
        public id?: number,
        public quantite?: number,
        public dateAchat?: Moment,
        public totalPrix?: number,
        public montantRestant?: number,
        public reglements?: IReglement[],
        public article?: IArticle,
        public fournisseur?: IFournisseur
    ) {}
}
