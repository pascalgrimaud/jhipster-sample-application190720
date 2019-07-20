/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplication190720TestModule } from '../../../test.module';
import { MoneyDetailComponent } from 'app/entities/money/money-detail.component';
import { Money } from 'app/shared/model/money.model';

describe('Component Tests', () => {
  describe('Money Management Detail Component', () => {
    let comp: MoneyDetailComponent;
    let fixture: ComponentFixture<MoneyDetailComponent>;
    const route = ({ data: of({ money: new Money(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplication190720TestModule],
        declarations: [MoneyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MoneyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MoneyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.money).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
