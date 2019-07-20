import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Purse } from 'app/shared/model/purse.model';
import { PurseService } from './purse.service';
import { PurseComponent } from './purse.component';
import { PurseDetailComponent } from './purse-detail.component';
import { PurseUpdateComponent } from './purse-update.component';
import { PurseDeletePopupComponent } from './purse-delete-dialog.component';
import { IPurse } from 'app/shared/model/purse.model';

@Injectable({ providedIn: 'root' })
export class PurseResolve implements Resolve<IPurse> {
  constructor(private service: PurseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPurse> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Purse>) => response.ok),
        map((purse: HttpResponse<Purse>) => purse.body)
      );
    }
    return of(new Purse());
  }
}

export const purseRoute: Routes = [
  {
    path: '',
    component: PurseComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Purses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PurseDetailComponent,
    resolve: {
      purse: PurseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Purses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PurseUpdateComponent,
    resolve: {
      purse: PurseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Purses'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PurseUpdateComponent,
    resolve: {
      purse: PurseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Purses'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const pursePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PurseDeletePopupComponent,
    resolve: {
      purse: PurseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Purses'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
