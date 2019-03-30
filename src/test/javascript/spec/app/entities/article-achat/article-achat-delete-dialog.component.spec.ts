/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionTestModule } from '../../../test.module';
import { ArticleAchatDeleteDialogComponent } from 'app/entities/article-achat/article-achat-delete-dialog.component';
import { ArticleAchatService } from 'app/entities/article-achat/article-achat.service';

describe('Component Tests', () => {
    describe('ArticleAchat Management Delete Component', () => {
        let comp: ArticleAchatDeleteDialogComponent;
        let fixture: ComponentFixture<ArticleAchatDeleteDialogComponent>;
        let service: ArticleAchatService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [ArticleAchatDeleteDialogComponent]
            })
                .overrideTemplate(ArticleAchatDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ArticleAchatDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArticleAchatService);
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
