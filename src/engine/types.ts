export enum BaseCards {
  Province = 'Province',
  Duchy = 'Duchy',
  Estate = 'Estate',
  Gold = 'Gold',
  Silver = 'Silver',
  Copper = 'Copper',
}
export enum BaseSet {
  Smithy = 'Smithy',
  Village = 'Village',
}
export type Card = BaseCards | BaseSet;

export type TurnState = {
  actions: number,
  buys: number,
  money: number,
  deck: Card[];
  hand: Card[];
  discard: Card[];
  play: Card[];
  readonly gained: Card[];
  turnNum: number;
};
export type SimFunction = (state: TurnState) => Card | undefined;
