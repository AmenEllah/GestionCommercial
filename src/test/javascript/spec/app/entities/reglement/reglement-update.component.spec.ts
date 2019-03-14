/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { ReglementUpdateComponent } from 'app/entities/reglement/reglement-update.component';
import { ReglementService } from 'app/entities/reglement/reglement.service';
import { Reglement } from 'app/shared/model/reglement.model';

describe('Component Tests', () => {
    describe('Reglement Management Update Component', () => {
        let comp: ReglementUpdateComponent;
        let fixture: ComponentFixture<ReglementUpdateComponent>;
        let service: ReglementService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [ReglementUpdateComponent]
            })
                .overrideTemplate(ReglementUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReglementUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReglementService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Reglement(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.reglement = entity;
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
                    const entity = new Reglement();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.reglement = entity;
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
