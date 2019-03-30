import { Moment } from 'moment';
import { IReglement } from 'app/shared/model/reglement.model';
import { IArticleAchat } from 'app/shared/model/article-achat.model';
import { IFournisseur } from 'app/shared/model/fournisseur.model';
import { IFactureAchat } from 'app/shared/model/facture-achat.model';

export interface IAchat {
    id?: number;
    dateAchat?: Moment;
    totalPrix?: number;
    montantRestant?: number;
    reglements?: IReglement[];
    articleAchats?: IArticleAchat[];
    fournisseur?: IFournisseur;
    factureAchat?: IFactureAchat;
}

export class Achat implements IAchat {
    constructor(
        public id?: number,
        public dateAchat?: Moment,
        public totalPrix?: number,
        public montantRestant?: number,
        public reglements?: IReglement[],
        public articleAchats?: IArticleAchat[],
        public fournisseur?: IFournisseur,
        public factureAchat?: IFactureAchat
    ) {}
}
