/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionTestModule } from '../../../test.module';
import { ArticleVenteComponent } from 'app/entities/article-vente/article-vente.component';
import { ArticleVenteService } from 'app/entities/article-vente/article-vente.service';
import { ArticleVente } from 'app/shared/model/article-vente.model';

describe('Component Tests', () => {
    describe('ArticleVente Management Component', () => {
        let comp: ArticleVenteComponent;
        let fixture: ComponentFixture<ArticleVenteComponent>;
        let service: ArticleVenteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [ArticleVenteComponent],
                providers: []
            })
                .overrideTemplate(ArticleVenteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ArticleVenteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ArticleVenteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ArticleVente(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.articleVentes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
