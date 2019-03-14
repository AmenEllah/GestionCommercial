import { Moment } from 'moment';
import { IAchat } from 'app/shared/model/achat.model';

export interface IReglement {
    id?: number;
    montant?: number;
    dateRec?: Moment;
    achat?: IAchat;
}

export class Reglement implements IReglement {
    constructor(public id?: number, public montant?: number, public dateRec?: Moment, public achat?: IAchat) {}
}
