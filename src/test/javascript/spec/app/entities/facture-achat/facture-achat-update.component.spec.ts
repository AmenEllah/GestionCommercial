/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { FactureAchatUpdateComponent } from 'app/entities/facture-achat/facture-achat-update.component';
import { FactureAchatService } from 'app/entities/facture-achat/facture-achat.service';
import { FactureAchat } from 'app/shared/model/facture-achat.model';

describe('Component Tests', () => {
    describe('FactureAchat Management Update Component', () => {
        let comp: FactureAchatUpdateComponent;
        let fixture: ComponentFixture<FactureAchatUpdateComponent>;
        let service: FactureAchatService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [FactureAchatUpdateComponent]
            })
                .overrideTemplate(FactureAchatUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FactureAchatUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FactureAchatService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FactureAchat(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.factureAchat = entity;
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
                    const entity = new FactureAchat();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.factureAchat = entity;
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
