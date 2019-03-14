/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionTestModule } from '../../../test.module';
import { ReglementComponent } from 'app/entities/reglement/reglement.component';
import { ReglementService } from 'app/entities/reglement/reglement.service';
import { Reglement } from 'app/shared/model/reglement.model';

describe('Component Tests', () => {
    describe('Reglement Management Component', () => {
        let comp: ReglementComponent;
        let fixture: ComponentFixture<ReglementComponent>;
        let service: ReglementService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [ReglementComponent],
                providers: []
            })
                .overrideTemplate(ReglementComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReglementComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReglementService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Reglement(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.reglements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
