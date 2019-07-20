/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplication190720TestModule } from '../../../test.module';
import { PurseDeleteDialogComponent } from 'app/entities/purse/purse-delete-dialog.component';
import { PurseService } from 'app/entities/purse/purse.service';

describe('Component Tests', () => {
  describe('Purse Management Delete Component', () => {
    let comp: PurseDeleteDialogComponent;
    let fixture: ComponentFixture<PurseDeleteDialogComponent>;
    let service: PurseService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplication190720TestModule],
        declarations: [PurseDeleteDialogComponent]
      })
        .overrideTemplate(PurseDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PurseDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PurseService);
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
