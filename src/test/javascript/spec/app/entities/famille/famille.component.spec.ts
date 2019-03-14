/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionTestModule } from '../../../test.module';
import { FamilleComponent } from 'app/entities/famille/famille.component';
import { FamilleService } from 'app/entities/famille/famille.service';
import { Famille } from 'app/shared/model/famille.model';

describe('Component Tests', () => {
    describe('Famille Management Component', () => {
        let comp: FamilleComponent;
        let fixture: ComponentFixture<FamilleComponent>;
        let service: FamilleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [FamilleComponent],
                providers: []
            })
                .overrideTemplate(FamilleComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FamilleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FamilleService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Famille(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.familles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
