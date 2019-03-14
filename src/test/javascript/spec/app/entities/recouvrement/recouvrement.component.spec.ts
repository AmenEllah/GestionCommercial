/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionTestModule } from '../../../test.module';
import { RecouvrementComponent } from 'app/entities/recouvrement/recouvrement.component';
import { RecouvrementService } from 'app/entities/recouvrement/recouvrement.service';
import { Recouvrement } from 'app/shared/model/recouvrement.model';

describe('Component Tests', () => {
    describe('Recouvrement Management Component', () => {
        let comp: RecouvrementComponent;
        let fixture: ComponentFixture<RecouvrementComponent>;
        let service: RecouvrementService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [RecouvrementComponent],
                providers: []
            })
                .overrideTemplate(RecouvrementComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RecouvrementComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RecouvrementService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Recouvrement(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.recouvrements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
