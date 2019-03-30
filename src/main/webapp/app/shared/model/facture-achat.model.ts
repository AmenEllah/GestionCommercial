import { IAchat } from 'app/shared/model/achat.model';

export interface IFactureAchat {
    id?: number;
    achat?: IAchat;
}

export class FactureAchat implements IFactureAchat {
    constructor(public id?: number, public achat?: IAchat) {}
}
