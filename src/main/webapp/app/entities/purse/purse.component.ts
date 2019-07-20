import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPurse } from 'app/shared/model/purse.model';
import { AccountService } from 'app/core';
import { PurseService } from './purse.service';

@Component({
  selector: 'jhi-purse',
  templateUrl: './purse.component.html'
})
export class PurseComponent implements OnInit, OnDestroy {
  purses: IPurse[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected purseService: PurseService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.purseService
      .query()
      .pipe(
        filter((res: HttpResponse<IPurse[]>) => res.ok),
        map((res: HttpResponse<IPurse[]>) => res.body)
      )
      .subscribe(
        (res: IPurse[]) => {
          this.purses = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPurses();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPurse) {
    return item.id;
  }

  registerChangeInPurses() {
    this.eventSubscriber = this.eventManager.subscribe('purseListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
