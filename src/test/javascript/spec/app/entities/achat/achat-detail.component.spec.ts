/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { AchatDetailComponent } from 'app/entities/achat/achat-detail.component';
import { Achat } from 'app/shared/model/achat.model';

describe('Component Tests', () => {
    describe('Achat Management Detail Component', () => {
        let comp: AchatDetailComponent;
        let fixture: ComponentFixture<AchatDetailComponent>;
        const route = ({ data: of({ achat: new Achat(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [AchatDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AchatDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AchatDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.achat).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
