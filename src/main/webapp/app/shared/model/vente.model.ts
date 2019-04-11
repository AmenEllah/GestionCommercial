import { Moment } from 'moment';
import { IRecouvrement } from 'app/shared/model/recouvrement.model';
import { IArticleVente } from 'app/shared/model/article-vente.model';
import { IClient } from 'app/shared/model/client.model';
import { IFactureVente } from 'app/shared/model/facture-vente.model';

export interface IVente {
    id?: number;
    dateVente?: Moment;
    totalPrix?: number;
    montantRestant?: number;
    remise?: number;
    recouvrements?: IRecouvrement[];
    articleVentes?: IArticleVente[];
    client?: IClient;
    factureVente?: IFactureVente;
}

export class Vente implements IVente {
    constructor(
        public id?: number,
        public dateVente?: Moment,
        public totalPrix?: number,
        public montantRestant?: number,
        public remise?: number,
        public recouvrements?: IRecouvrement[],
        public articleVentes?: IArticleVente[],
        public client?: IClient,
        public factureVente?: IFactureVente
    ) {}
}
