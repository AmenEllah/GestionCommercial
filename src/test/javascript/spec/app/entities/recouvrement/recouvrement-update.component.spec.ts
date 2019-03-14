/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { RecouvrementUpdateComponent } from 'app/entities/recouvrement/recouvrement-update.component';
import { RecouvrementService } from 'app/entities/recouvrement/recouvrement.service';
import { Recouvrement } from 'app/shared/model/recouvrement.model';

describe('Component Tests', () => {
    describe('Recouvrement Management Update Component', () => {
        let comp: RecouvrementUpdateComponent;
        let fixture: ComponentFixture<RecouvrementUpdateComponent>;
        let service: RecouvrementService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [RecouvrementUpdateComponent]
            })
                .overrideTemplate(RecouvrementUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RecouvrementUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RecouvrementService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Recouvrement(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.recouvrement = entity;
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
                    const entity = new Recouvrement();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.recouvrement = entity;
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
