/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplication190720TestModule } from '../../../test.module';
import { PurseComponent } from 'app/entities/purse/purse.component';
import { PurseService } from 'app/entities/purse/purse.service';
import { Purse } from 'app/shared/model/purse.model';

describe('Component Tests', () => {
  describe('Purse Management Component', () => {
    let comp: PurseComponent;
    let fixture: ComponentFixture<PurseComponent>;
    let service: PurseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplication190720TestModule],
        declarations: [PurseComponent],
        providers: []
      })
        .overrideTemplate(PurseComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PurseComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PurseService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Purse(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.purses[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
