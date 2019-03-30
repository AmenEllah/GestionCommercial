/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionTestModule } from '../../../test.module';
import { FactureAchatComponent } from 'app/entities/facture-achat/facture-achat.component';
import { FactureAchatService } from 'app/entities/facture-achat/facture-achat.service';
import { FactureAchat } from 'app/shared/model/facture-achat.model';

describe('Component Tests', () => {
    describe('FactureAchat Management Component', () => {
        let comp: FactureAchatComponent;
        let fixture: ComponentFixture<FactureAchatComponent>;
        let service: FactureAchatService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [FactureAchatComponent],
                providers: []
            })
                .overrideTemplate(FactureAchatComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FactureAchatComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FactureAchatService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FactureAchat(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.factureAchats[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
