import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMoney } from 'app/shared/model/money.model';

@Component({
  selector: 'jhi-money-detail',
  templateUrl: './money-detail.component.html'
})
export class MoneyDetailComponent implements OnInit {
  money: IMoney;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ money }) => {
      this.money = money;
    });
  }

  previousState() {
    window.history.back();
  }
}
