import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IMoney } from 'app/shared/model/money.model';
import { AccountService } from 'app/core';
import { MoneyService } from './money.service';

@Component({
  selector: 'jhi-money',
  templateUrl: './money.component.html'
})
export class MoneyComponent implements OnInit, OnDestroy {
  monies: IMoney[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected moneyService: MoneyService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.moneyService
      .query()
      .pipe(
        filter((res: HttpResponse<IMoney[]>) => res.ok),
        map((res: HttpResponse<IMoney[]>) => res.body)
      )
      .subscribe(
        (res: IMoney[]) => {
          this.monies = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMonies();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMoney) {
    return item.id;
  }

  registerChangeInMonies() {
    this.eventSubscriber = this.eventManager.subscribe('moneyListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
