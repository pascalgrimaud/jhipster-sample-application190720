import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplication190720SharedModule } from 'app/shared';
import {
  PurseComponent,
  PurseDetailComponent,
  PurseUpdateComponent,
  PurseDeletePopupComponent,
  PurseDeleteDialogComponent,
  purseRoute,
  pursePopupRoute
} from './';

const ENTITY_STATES = [...purseRoute, ...pursePopupRoute];

@NgModule({
  imports: [JhipsterSampleApplication190720SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PurseComponent, PurseDetailComponent, PurseUpdateComponent, PurseDeleteDialogComponent, PurseDeletePopupComponent],
  entryComponents: [PurseComponent, PurseUpdateComponent, PurseDeleteDialogComponent, PurseDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplication190720PurseModule {}
