/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionTestModule } from '../../../test.module';
import { FactureVenteDeleteDialogComponent } from 'app/entities/facture-vente/facture-vente-delete-dialog.component';
import { FactureVenteService } from 'app/entities/facture-vente/facture-vente.service';

describe('Component Tests', () => {
    describe('FactureVente Management Delete Component', () => {
        let comp: FactureVenteDeleteDialogComponent;
        let fixture: ComponentFixture<FactureVenteDeleteDialogComponent>;
        let service: FactureVenteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [FactureVenteDeleteDialogComponent]
            })
                .overrideTemplate(FactureVenteDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FactureVenteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FactureVenteService);
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
