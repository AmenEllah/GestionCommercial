/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionTestModule } from '../../../test.module';
import { ReglementDeleteDialogComponent } from 'app/entities/reglement/reglement-delete-dialog.component';
import { ReglementService } from 'app/entities/reglement/reglement.service';

describe('Component Tests', () => {
    describe('Reglement Management Delete Component', () => {
        let comp: ReglementDeleteDialogComponent;
        let fixture: ComponentFixture<ReglementDeleteDialogComponent>;
        let service: ReglementService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [ReglementDeleteDialogComponent]
            })
                .overrideTemplate(ReglementDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReglementDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReglementService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
