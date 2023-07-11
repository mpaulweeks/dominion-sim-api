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
export type CardID = BaseCards | BaseSet;

export type PlayerState = {
  turnNum: number;
  deck: CardID[];
  hand: CardID[];
  discard: CardID[];
  play: CardID[];
  readonly gained: CardID[];
  readonly trashed: CardID[];
};

export type ActiveTurnState = {
  actions: number,
  buys: number,
  money: number,
};

export type SimFunction = (
  player: PlayerState,
  turn: ActiveTurnState,
) => CardID | undefined;
