import { IAchat } from 'app/shared/model/achat.model';

export interface IFournisseur {
    id?: number;
    code?: string;
    nom?: string;
    matricule?: string;
    codePostal?: string;
    adresse?: string;
    telephone?: string;
    achats?: IAchat[];
}

export class Fournisseur implements IFournisseur {
    constructor(
        public id?: number,
        public code?: string,
        public nom?: string,
        public matricule?: string,
        public codePostal?: string,
        public adresse?: string,
        public telephone?: string,
        public achats?: IAchat[]
    ) {}
}
