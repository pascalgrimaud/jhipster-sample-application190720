import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPurse, Purse } from 'app/shared/model/purse.model';
import { PurseService } from './purse.service';

@Component({
  selector: 'jhi-purse-update',
  templateUrl: './purse-update.component.html'
})
export class PurseUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(protected purseService: PurseService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ purse }) => {
      this.updateForm(purse);
    });
  }

  updateForm(purse: IPurse) {
    this.editForm.patchValue({
      id: purse.id,
      name: purse.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const purse = this.createFromForm();
    if (purse.id !== undefined) {
      this.subscribeToSaveResponse(this.purseService.update(purse));
    } else {
      this.subscribeToSaveResponse(this.purseService.create(purse));
    }
  }

  private createFromForm(): IPurse {
    return {
      ...new Purse(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPurse>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
