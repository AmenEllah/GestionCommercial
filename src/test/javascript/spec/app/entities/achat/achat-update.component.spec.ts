/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { AchatUpdateComponent } from 'app/entities/achat/achat-update.component';
import { AchatService } from 'app/entities/achat/achat.service';
import { Achat } from 'app/shared/model/achat.model';

describe('Component Tests', () => {
    describe('Achat Management Update Component', () => {
        let comp: AchatUpdateComponent;
        let fixture: ComponentFixture<AchatUpdateComponent>;
        let service: AchatService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [AchatUpdateComponent]
            })
                .overrideTemplate(AchatUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AchatUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AchatService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Achat(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.achat = entity;
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
                    const entity = new Achat();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.achat = entity;
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
