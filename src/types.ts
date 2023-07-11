export enum BaseCards {
  Province = 'Province',
  Duchy = 'Duchy',
  Estate = 'Estate',
  Curse = 'Curse',
  Gold = 'Gold',
  Silver = 'Silver',
  Copper = 'Copper',
}
export enum BaseSet {
  Smithy = 'Smithy',
  Village = 'Village',
}
export type CardID = BaseCards | BaseSet;

export enum CardType {
  Victory = 1,
  Curse,
  Action,
  Treasure,
};

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
  actions: number;
  buys: number;
  money: number;
};

export type SimFunction = (
  player: PlayerState,
  turn: ActiveTurnState,
) => CardID | undefined;

// card
export type BasicEffects = {
  actions?: number;
  draw?: number;
  buys?: number;
  money?: number;
  vp?: number;
};

export type CardProperties = {
  id: CardID;
  cost: number;
  types: CardType[];
  basicEffects?: BasicEffects;
}
