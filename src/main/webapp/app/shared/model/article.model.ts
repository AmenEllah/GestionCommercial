import { IAchat } from 'app/shared/model/achat.model';
import { IVente } from 'app/shared/model/vente.model';
import { IFamille } from 'app/shared/model/famille.model';

export interface IArticle {
    id?: number;
    code?: string;
    libelle?: string;
    tVa?: number;
    unite?: string;
    prix?: number;
    totalVente?: number;
    totalAchat?: number;
    stockInitiale?: number;
    achats?: IAchat[];
    ventes?: IVente[];
    famille?: IFamille;
}

export class Article implements IArticle {
    constructor(
        public id?: number,
        public code?: string,
        public libelle?: string,
        public tVa?: number,
        public unite?: string,
        public prix?: number,
        public totalVente?: number,
        public totalAchat?: number,
        public stockInitiale?: number,
        public achats?: IAchat[],
        public ventes?: IVente[],
        public famille?: IFamille
    ) {}
}
