import { IPurse } from 'app/shared/model/purse.model';

export interface IMoney {
  id?: number;
  count?: number;
  name?: string;
  purse?: IPurse;
}

export class Money implements IMoney {
  constructor(public id?: number, public count?: number, public name?: string, public purse?: IPurse) {}
}
