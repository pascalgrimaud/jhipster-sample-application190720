import { IMoney } from 'app/shared/model/money.model';

export interface IPurse {
  id?: number;
  name?: string;
  monies?: IMoney[];
}

export class Purse implements IPurse {
  constructor(public id?: number, public name?: string, public monies?: IMoney[]) {}
}
