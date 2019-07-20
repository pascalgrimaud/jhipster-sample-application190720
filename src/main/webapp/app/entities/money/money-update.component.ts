import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMoney, Money } from 'app/shared/model/money.model';
import { MoneyService } from './money.service';
import { IPurse } from 'app/shared/model/purse.model';
import { PurseService } from 'app/entities/purse';

@Component({
  selector: 'jhi-money-update',
  templateUrl: './money-update.component.html'
})
export class MoneyUpdateComponent implements OnInit {
  isSaving: boolean;

  purses: IPurse[];

  editForm = this.fb.group({
    id: [],
    count: [],
    name: [],
    purse: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected moneyService: MoneyService,
    protected purseService: PurseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ money }) => {
      this.updateForm(money);
    });
    this.purseService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPurse[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPurse[]>) => response.body)
      )
      .subscribe((res: IPurse[]) => (this.purses = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(money: IMoney) {
    this.editForm.patchValue({
      id: money.id,
      count: money.count,
      name: money.name,
      purse: money.purse
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const money = this.createFromForm();
    if (money.id !== undefined) {
      this.subscribeToSaveResponse(this.moneyService.update(money));
    } else {
      this.subscribeToSaveResponse(this.moneyService.create(money));
    }
  }

  private createFromForm(): IMoney {
    return {
      ...new Money(),
      id: this.editForm.get(['id']).value,
      count: this.editForm.get(['count']).value,
      name: this.editForm.get(['name']).value,
      purse: this.editForm.get(['purse']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMoney>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackPurseById(index: number, item: IPurse) {
    return item.id;
  }
}
