import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Money } from 'app/shared/model/money.model';
import { MoneyService } from './money.service';
import { MoneyComponent } from './money.component';
import { MoneyDetailComponent } from './money-detail.component';
import { MoneyUpdateComponent } from './money-update.component';
import { MoneyDeletePopupComponent } from './money-delete-dialog.component';
import { IMoney } from 'app/shared/model/money.model';

@Injectable({ providedIn: 'root' })
export class MoneyResolve implements Resolve<IMoney> {
  constructor(private service: MoneyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMoney> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Money>) => response.ok),
        map((money: HttpResponse<Money>) => money.body)
      );
    }
    return of(new Money());
  }
}

export const moneyRoute: Routes = [
  {
    path: '',
    component: MoneyComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Monies'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MoneyDetailComponent,
    resolve: {
      money: MoneyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Monies'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MoneyUpdateComponent,
    resolve: {
      money: MoneyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Monies'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MoneyUpdateComponent,
    resolve: {
      money: MoneyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Monies'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const moneyPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MoneyDeletePopupComponent,
    resolve: {
      money: MoneyResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Monies'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
