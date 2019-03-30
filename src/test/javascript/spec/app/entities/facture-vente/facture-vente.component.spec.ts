/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionTestModule } from '../../../test.module';
import { FactureVenteComponent } from 'app/entities/facture-vente/facture-vente.component';
import { FactureVenteService } from 'app/entities/facture-vente/facture-vente.service';
import { FactureVente } from 'app/shared/model/facture-vente.model';

describe('Component Tests', () => {
    describe('FactureVente Management Component', () => {
        let comp: FactureVenteComponent;
        let fixture: ComponentFixture<FactureVenteComponent>;
        let service: FactureVenteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [FactureVenteComponent],
                providers: []
            })
                .overrideTemplate(FactureVenteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FactureVenteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FactureVenteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FactureVente(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.factureVentes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
