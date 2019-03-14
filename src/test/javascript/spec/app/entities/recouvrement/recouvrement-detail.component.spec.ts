/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { RecouvrementDetailComponent } from 'app/entities/recouvrement/recouvrement-detail.component';
import { Recouvrement } from 'app/shared/model/recouvrement.model';

describe('Component Tests', () => {
    describe('Recouvrement Management Detail Component', () => {
        let comp: RecouvrementDetailComponent;
        let fixture: ComponentFixture<RecouvrementDetailComponent>;
        const route = ({ data: of({ recouvrement: new Recouvrement(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [RecouvrementDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RecouvrementDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RecouvrementDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.recouvrement).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
