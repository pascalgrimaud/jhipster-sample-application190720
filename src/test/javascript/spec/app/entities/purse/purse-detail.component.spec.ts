/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplication190720TestModule } from '../../../test.module';
import { PurseDetailComponent } from 'app/entities/purse/purse-detail.component';
import { Purse } from 'app/shared/model/purse.model';

describe('Component Tests', () => {
  describe('Purse Management Detail Component', () => {
    let comp: PurseDetailComponent;
    let fixture: ComponentFixture<PurseDetailComponent>;
    const route = ({ data: of({ purse: new Purse(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplication190720TestModule],
        declarations: [PurseDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PurseDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PurseDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.purse).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
