/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { ArticleAchatUpdateComponent } from 'app/entities/article-achat/article-achat-update.component';
import { ArticleAchatService } from 'app/entities/article-achat/article-achat.service';
import { ArticleAchat } from 'app/shared/model/article-achat.model';

describe('Component Tests', () => {
    describe('ArticleAchat Management Update Component', () => {
        let comp: ArticleAchatUpdateComponent;
        let fixture: ComponentFixture<ArticleAchatUpdateComponent>;
        let service: ArticleAchatService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [ArticleAchatUpdateComponent]
            })
                .overrideTemplate(ArticleAchatUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ArticleAchatUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArticleAchatService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ArticleAchat(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.articleAchat = entity;
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
                    const entity = new ArticleAchat();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.articleAchat = entity;
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
