/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { FamilleUpdateComponent } from 'app/entities/famille/famille-update.component';
import { FamilleService } from 'app/entities/famille/famille.service';
import { Famille } from 'app/shared/model/famille.model';

describe('Component Tests', () => {
    describe('Famille Management Update Component', () => {
        let comp: FamilleUpdateComponent;
        let fixture: ComponentFixture<FamilleUpdateComponent>;
        let service: FamilleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [FamilleUpdateComponent]
            })
                .overrideTemplate(FamilleUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FamilleUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FamilleService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Famille(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.famille = entity;
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
                    const entity = new Famille();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.famille = entity;
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
