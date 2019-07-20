import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IPurse } from 'app/shared/model/purse.model';

type EntityResponseType = HttpResponse<IPurse>;
type EntityArrayResponseType = HttpResponse<IPurse[]>;

@Injectable({ providedIn: 'root' })
export class PurseService {
  public resourceUrl = SERVER_API_URL + 'api/purses';

  constructor(protected http: HttpClient) {}

  create(purse: IPurse): Observable<EntityResponseType> {
    return this.http.post<IPurse>(this.resourceUrl, purse, { observe: 'response' });
  }

  update(purse: IPurse): Observable<EntityResponseType> {
    return this.http.put<IPurse>(this.resourceUrl, purse, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPurse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPurse[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
