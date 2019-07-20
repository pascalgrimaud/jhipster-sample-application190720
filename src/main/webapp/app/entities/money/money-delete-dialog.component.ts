import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMoney } from 'app/shared/model/money.model';
import { MoneyService } from './money.service';

@Component({
  selector: 'jhi-money-delete-dialog',
  templateUrl: './money-delete-dialog.component.html'
})
export class MoneyDeleteDialogComponent {
  money: IMoney;

  constructor(protected moneyService: MoneyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.moneyService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'moneyListModification',
        content: 'Deleted an money'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-money-delete-popup',
  template: ''
})
export class MoneyDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ money }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MoneyDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.money = money;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/money', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/money', { outlets: { popup: null } }]);
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
