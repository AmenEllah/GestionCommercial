/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionTestModule } from '../../../test.module';
import { ArticleVenteDeleteDialogComponent } from 'app/entities/article-vente/article-vente-delete-dialog.component';
import { ArticleVenteService } from 'app/entities/article-vente/article-vente.service';

describe('Component Tests', () => {
    describe('ArticleVente Management Delete Component', () => {
        let comp: ArticleVenteDeleteDialogComponent;
        let fixture: ComponentFixture<ArticleVenteDeleteDialogComponent>;
        let service: ArticleVenteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [ArticleVenteDeleteDialogComponent]
            })
                .overrideTemplate(ArticleVenteDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ArticleVenteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArticleVenteService);
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
