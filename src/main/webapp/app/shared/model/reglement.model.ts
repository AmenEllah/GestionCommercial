import { Moment } from 'moment';
import { IAchat } from 'app/shared/model/achat.model';

export const enum EnumModePaiement {
    CHÈQUES = 'CHÈQUES	',
    ESPÈCES = 'ESPÈCES',
    CARTE_BANQUAIRE = 'CARTE_BANQUAIRE'
}

export interface IReglement {
    id?: number;
    montant?: number;
    dateReg?: Moment;
    modeReglement?: EnumModePaiement;
    achat?: IAchat;
}

export class Reglement implements IReglement {
    constructor(
        public id?: number,
        public montant?: number,
        public dateReg?: Moment,
        public modeReglement?: EnumModePaiement,
        public achat?: IAchat
    ) {}
}
