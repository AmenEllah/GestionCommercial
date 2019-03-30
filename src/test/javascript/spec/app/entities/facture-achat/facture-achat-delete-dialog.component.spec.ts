/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionTestModule } from '../../../test.module';
import { FactureAchatDeleteDialogComponent } from 'app/entities/facture-achat/facture-achat-delete-dialog.component';
import { FactureAchatService } from 'app/entities/facture-achat/facture-achat.service';

describe('Component Tests', () => {
    describe('FactureAchat Management Delete Component', () => {
        let comp: FactureAchatDeleteDialogComponent;
        let fixture: ComponentFixture<FactureAchatDeleteDialogComponent>;
        let service: FactureAchatService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [FactureAchatDeleteDialogComponent]
            })
                .overrideTemplate(FactureAchatDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FactureAchatDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FactureAchatService);
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
