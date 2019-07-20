import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'money',
        loadChildren: './money/money.module#JhipsterSampleApplication190720MoneyModule'
      },
      {
        path: 'purse',
        loadChildren: './purse/purse.module#JhipsterSampleApplication190720PurseModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplication190720EntityModule {}
