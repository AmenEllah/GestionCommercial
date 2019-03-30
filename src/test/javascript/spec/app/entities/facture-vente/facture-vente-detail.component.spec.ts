/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { FactureVenteDetailComponent } from 'app/entities/facture-vente/facture-vente-detail.component';
import { FactureVente } from 'app/shared/model/facture-vente.model';

describe('Component Tests', () => {
    describe('FactureVente Management Detail Component', () => {
        let comp: FactureVenteDetailComponent;
        let fixture: ComponentFixture<FactureVenteDetailComponent>;
        const route = ({ data: of({ factureVente: new FactureVente(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [FactureVenteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FactureVenteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FactureVenteDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.factureVente).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
