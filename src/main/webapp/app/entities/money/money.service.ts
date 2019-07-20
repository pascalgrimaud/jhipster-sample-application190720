import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMoney } from 'app/shared/model/money.model';

type EntityResponseType = HttpResponse<IMoney>;
type EntityArrayResponseType = HttpResponse<IMoney[]>;

@Injectable({ providedIn: 'root' })
export class MoneyService {
  public resourceUrl = SERVER_API_URL + 'api/monies';

  constructor(protected http: HttpClient) {}

  create(money: IMoney): Observable<EntityResponseType> {
    return this.http.post<IMoney>(this.resourceUrl, money, { observe: 'response' });
  }

  update(money: IMoney): Observable<EntityResponseType> {
    return this.http.put<IMoney>(this.resourceUrl, money, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMoney>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMoney[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
