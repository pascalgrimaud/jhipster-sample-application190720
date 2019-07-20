import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication190720SharedModule } from 'app/shared';
import {
  MoneyComponent,
  MoneyDetailComponent,
  MoneyUpdateComponent,
  MoneyDeletePopupComponent,
  MoneyDeleteDialogComponent,
  moneyRoute,
  moneyPopupRoute
} from './';

const ENTITY_STATES = [...moneyRoute, ...moneyPopupRoute];

@NgModule({
  imports: [JhipsterSampleApplication190720SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MoneyComponent, MoneyDetailComponent, MoneyUpdateComponent, MoneyDeleteDialogComponent, MoneyDeletePopupComponent],
  entryComponents: [MoneyComponent, MoneyUpdateComponent, MoneyDeleteDialogComponent, MoneyDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplication190720MoneyModule {}
