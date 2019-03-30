/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { FactureVenteUpdateComponent } from 'app/entities/facture-vente/facture-vente-update.component';
import { FactureVenteService } from 'app/entities/facture-vente/facture-vente.service';
import { FactureVente } from 'app/shared/model/facture-vente.model';

describe('Component Tests', () => {
    describe('FactureVente Management Update Component', () => {
        let comp: FactureVenteUpdateComponent;
        let fixture: ComponentFixture<FactureVenteUpdateComponent>;
        let service: FactureVenteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [FactureVenteUpdateComponent]
            })
                .overrideTemplate(FactureVenteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FactureVenteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FactureVenteService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FactureVente(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.factureVente = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FactureVente();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.factureVente = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
