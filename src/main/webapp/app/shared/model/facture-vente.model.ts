import { IVente } from 'app/shared/model/vente.model';

export interface IFactureVente {
    id?: number;
    vente?: IVente;
}

export class FactureVente implements IFactureVente {
    constructor(public id?: number, public vente?: IVente) {}
}
