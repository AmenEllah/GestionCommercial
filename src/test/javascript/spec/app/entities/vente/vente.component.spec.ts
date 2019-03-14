/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionTestModule } from '../../../test.module';
import { VenteComponent } from 'app/entities/vente/vente.component';
import { VenteService } from 'app/entities/vente/vente.service';
import { Vente } from 'app/shared/model/vente.model';

describe('Component Tests', () => {
    describe('Vente Management Component', () => {
        let comp: VenteComponent;
        let fixture: ComponentFixture<VenteComponent>;
        let service: VenteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [VenteComponent],
                providers: []
            })
                .overrideTemplate(VenteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VenteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VenteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Vente(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.ventes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
