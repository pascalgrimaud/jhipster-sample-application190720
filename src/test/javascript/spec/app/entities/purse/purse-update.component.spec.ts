/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplication190720TestModule } from '../../../test.module';
import { PurseUpdateComponent } from 'app/entities/purse/purse-update.component';
import { PurseService } from 'app/entities/purse/purse.service';
import { Purse } from 'app/shared/model/purse.model';

describe('Component Tests', () => {
  describe('Purse Management Update Component', () => {
    let comp: PurseUpdateComponent;
    let fixture: ComponentFixture<PurseUpdateComponent>;
    let service: PurseService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplication190720TestModule],
        declarations: [PurseUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PurseUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PurseUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PurseService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Purse(123);
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
        const entity = new Purse();
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
