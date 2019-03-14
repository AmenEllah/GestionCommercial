/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionTestModule } from '../../../test.module';
import { FournisseurDeleteDialogComponent } from 'app/entities/fournisseur/fournisseur-delete-dialog.component';
import { FournisseurService } from 'app/entities/fournisseur/fournisseur.service';

describe('Component Tests', () => {
    describe('Fournisseur Management Delete Component', () => {
        let comp: FournisseurDeleteDialogComponent;
        let fixture: ComponentFixture<FournisseurDeleteDialogComponent>;
        let service: FournisseurService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [FournisseurDeleteDialogComponent]
            })
                .overrideTemplate(FournisseurDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FournisseurDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FournisseurService);
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
