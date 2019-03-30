/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { ArticleVenteDetailComponent } from 'app/entities/article-vente/article-vente-detail.component';
import { ArticleVente } from 'app/shared/model/article-vente.model';

describe('Component Tests', () => {
    describe('ArticleVente Management Detail Component', () => {
        let comp: ArticleVenteDetailComponent;
        let fixture: ComponentFixture<ArticleVenteDetailComponent>;
        const route = ({ data: of({ articleVente: new ArticleVente(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [ArticleVenteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ArticleVenteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ArticleVenteDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.articleVente).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
