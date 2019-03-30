/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { ArticleAchatDetailComponent } from 'app/entities/article-achat/article-achat-detail.component';
import { ArticleAchat } from 'app/shared/model/article-achat.model';

describe('Component Tests', () => {
    describe('ArticleAchat Management Detail Component', () => {
        let comp: ArticleAchatDetailComponent;
        let fixture: ComponentFixture<ArticleAchatDetailComponent>;
        const route = ({ data: of({ articleAchat: new ArticleAchat(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [ArticleAchatDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ArticleAchatDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ArticleAchatDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.articleAchat).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
