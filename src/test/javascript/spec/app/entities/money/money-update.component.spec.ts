/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplication190720TestModule } from '../../../test.module';
import { MoneyUpdateComponent } from 'app/entities/money/money-update.component';
import { MoneyService } from 'app/entities/money/money.service';
import { Money } from 'app/shared/model/money.model';

describe('Component Tests', () => {
  describe('Money Management Update Component', () => {
    let comp: MoneyUpdateComponent;
    let fixture: ComponentFixture<MoneyUpdateComponent>;
    let service: MoneyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplication190720TestModule],
        declarations: [MoneyUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MoneyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MoneyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MoneyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Money(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Money();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
