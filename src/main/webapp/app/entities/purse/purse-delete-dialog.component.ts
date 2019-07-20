import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPurse } from 'app/shared/model/purse.model';
import { PurseService } from './purse.service';

@Component({
  selector: 'jhi-purse-delete-dialog',
  templateUrl: './purse-delete-dialog.component.html'
})
export class PurseDeleteDialogComponent {
  purse: IPurse;

  constructor(protected purseService: PurseService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.purseService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'purseListModification',
        content: 'Deleted an purse'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-purse-delete-popup',
  template: ''
})
export class PurseDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ purse }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PurseDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.purse = purse;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/purse', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/purse', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
