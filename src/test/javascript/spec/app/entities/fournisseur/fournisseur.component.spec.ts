/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionTestModule } from '../../../test.module';
import { FournisseurComponent } from 'app/entities/fournisseur/fournisseur.component';
import { FournisseurService } from 'app/entities/fournisseur/fournisseur.service';
import { Fournisseur } from 'app/shared/model/fournisseur.model';

describe('Component Tests', () => {
    describe('Fournisseur Management Component', () => {
        let comp: FournisseurComponent;
        let fixture: ComponentFixture<FournisseurComponent>;
        let service: FournisseurService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionTestModule],
                declarations: [FournisseurComponent],
                providers: []
            })
                .overrideTemplate(FournisseurComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FournisseurComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FournisseurService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Fournisseur(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.fournisseurs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
