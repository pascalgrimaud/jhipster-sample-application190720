/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplication190720TestModule } from '../../../test.module';
import { MoneyDeleteDialogComponent } from 'app/entities/money/money-delete-dialog.component';
import { MoneyService } from 'app/entities/money/money.service';

describe('Component Tests', () => {
  describe('Money Management Delete Component', () => {
    let comp: MoneyDeleteDialogComponent;
    let fixture: ComponentFixture<MoneyDeleteDialogComponent>;
    let service: MoneyService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplication190720TestModule],
        declarations: [MoneyDeleteDialogComponent]
      })
        .overrideTemplate(MoneyDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MoneyDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MoneyService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
