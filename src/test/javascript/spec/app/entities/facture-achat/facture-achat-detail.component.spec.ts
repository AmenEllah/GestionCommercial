/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionTestModule } from '../../../test.module';
import { FactureAchatDetailComponent } from 'app/entities/facture-achat/facture-achat-detail.component';
import { FactureAchat } from 'app/shared/model/facture-achat.model';

describe('Component Tests', () => {
    describe('FactureAchat Management Detail Component', () => {
        let comp: FactureAchatDetailComponent;
        let fixture: ComponentFixture<FactureAchatDetailComponent>;
        const route = ({ data: of({ factureAchat: new FactureAchat(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [FactureAchatDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FactureAchatDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FactureAchatDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.factureAchat).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
