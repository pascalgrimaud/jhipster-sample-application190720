import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPurse } from 'app/shared/model/purse.model';

@Component({
  selector: 'jhi-purse-detail',
  templateUrl: './purse-detail.component.html'
})
export class PurseDetailComponent implements OnInit {
  purse: IPurse;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ purse }) => {
      this.purse = purse;
    });
  }

  previousState() {
    window.history.back();
  }
}
