import { IVente } from 'app/shared/model/vente.model';

export interface IClient {
    id?: number;
    code?: string;
    nom?: string;
    matricule?: string;
    codePostal?: string;
    telephone?: string;
    adresse?: string;
    ventes?: IVente[];
}

export class Client implements IClient {
    constructor(
        public id?: number,
        public code?: string,
        public nom?: string,
        public matricule?: string,
        public codePostal?: string,
        public telephone?: string,
        public adresse?: string,
        public ventes?: IVente[]
    ) {}
}
