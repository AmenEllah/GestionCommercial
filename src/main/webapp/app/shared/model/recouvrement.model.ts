import { Moment } from 'moment';
import { IVente } from 'app/shared/model/vente.model';

export const enum EnumModePaiement {
    CHÈQUES = 'CHÈQUES	',
    ESPÈCES = 'ESPÈCES',
    CARTE_BANQUAIRE = 'CARTE_BANQUAIRE'
}

export interface IRecouvrement {
    id?: number;
    montant?: number;
    dateRec?: Moment;
    modeRecouvrement?: EnumModePaiement;
    vente?: IVente;
}

export class Recouvrement implements IRecouvrement {
    constructor(
        public id?: number,
        public montant?: number,
        public dateRec?: Moment,
        public modeRecouvrement?: EnumModePaiement,
        public vente?: IVente
    ) {}
}
