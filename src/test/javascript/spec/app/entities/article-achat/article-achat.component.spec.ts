/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionTestModule } from '../../../test.module';
import { ArticleAchatComponent } from 'app/entities/article-achat/article-achat.component';
import { ArticleAchatService } from 'app/entities/article-achat/article-achat.service';
import { ArticleAchat } from 'app/shared/model/article-achat.model';

describe('Component Tests', () => {
    describe('ArticleAchat Management Component', () => {
        let comp: ArticleAchatComponent;
        let fixture: ComponentFixture<ArticleAchatComponent>;
        let service: ArticleAchatService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [ArticleAchatComponent],
                providers: []
            })
                .overrideTemplate(ArticleAchatComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ArticleAchatComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArticleAchatService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ArticleAchat(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.articleAchats[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
