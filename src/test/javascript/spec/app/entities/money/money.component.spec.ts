/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplication190720TestModule } from '../../../test.module';
import { MoneyComponent } from 'app/entities/money/money.component';
import { MoneyService } from 'app/entities/money/money.service';
import { Money } from 'app/shared/model/money.model';

describe('Component Tests', () => {
  describe('Money Management Component', () => {
    let comp: MoneyComponent;
    let fixture: ComponentFixture<MoneyComponent>;
    let service: MoneyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplication190720TestModule],
        declarations: [MoneyComponent],
        providers: []
      })
        .overrideTemplate(MoneyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MoneyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MoneyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Money(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.monies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
