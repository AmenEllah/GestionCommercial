import { Moment } from 'moment';
import { IVente } from 'app/shared/model/vente.model';

export interface IRecouvrement {
    id?: number;
    montant?: number;
    dateRec?: Moment;
    vente?: IVente;
}

export class Recouvrement implements IRecouvrement {
    constructor(public id?: number, public montant?: number, public dateRec?: Moment, public vente?: IVente) {}
}
