import { Moment } from 'moment';
import { IRecouvrement } from 'app/shared/model/recouvrement.model';
import { IArticle } from 'app/shared/model/article.model';
import { IClient } from 'app/shared/model/client.model';

export interface IVente {
    id?: number;
    quantite?: number;
    dateVente?: Moment;
    totalPrix?: number;
    recouvrements?: IRecouvrement[];
    article?: IArticle;
    client?: IClient;
}

export class Vente implements IVente {
    constructor(
        public id?: number,
        public quantite?: number,
        public dateVente?: Moment,
        public totalPrix?: number,
        public recouvrements?: IRecouvrement[],
        public article?: IArticle,
        public client?: IClient
    ) {}
}
