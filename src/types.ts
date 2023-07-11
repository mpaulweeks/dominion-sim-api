export enum CardType {
  Victory = 1,
  Curse,
  Action,
  Treasure,
};
export enum BasicCards {
  Province = 'province',
  Duchy = 'duchy',
  Estate = 'estate',
  Curse = 'curse',
  Gold = 'gold',
  Silver = 'silver',
  Copper = 'copper',
}
export enum BaseSet {
  Cellar = 'cellar',
  Chapel = 'chapel',
  Moat = 'moat',
  Harbinger = 'harbinger',
  Merchant = 'merchant',
  Vassal = 'vassal',
  Workshop = 'workshop',
  Bureaucrat = 'bureaucrat',
  Gardens = 'gardens',
  Militia = 'militia',
  Moneylender = 'moneylender',
  Poacher = 'poacher',
  Remodel = 'remodel',
  ThroneRoom = 'throne room',
  Bandit = 'bandit',
  CouncilRoom = 'council room',
  Festival = 'festival',
  Laboratory = 'laboratory',
  Library = 'library',
  Market = 'market',
  Mine = 'mine',
  Sentry = 'sentry',
  Witch = 'witch',
  Artisan = 'artisan',
  Smithy = 'smithy',
  Village = 'village',
}
export type CardID = BasicCards | BaseSet;

// state
export type PlayerState = {
  turnNum: number;
  deck: CardID[];
  hand: CardID[];
  discard: CardID[];
  play: CardID[];
  readonly gainHistory: CardID[];
  readonly trashHistory: CardID[];
};
export type ActiveTurnState = {
  actions: number;
  buys: number;
  money: number;
};
export type TurnSnapshot = {
  shuffles: number;
  money: number;
  vpTotal: number;
};
export function NewTurnSnapshot(): TurnSnapshot {
  return {
    shuffles: 0,
    money: 0,
    vpTotal: 0,
  };
}

// card
export type PlayEffects = {
  actions?: number;
  draw?: number;
  buys?: number;
  money?: number;
  vpChips?: number;
  trashFromHand?: CardID[];
};
export type CardProperties = {
  id: CardID;
  cost: number;
  types: CardType[];
  vp?: number;
  onPlay?: (player: PlayerState) => PlayEffects;
}

// strategy
export const Infin = '∞';
export type BuyOrder = [CardID, typeof Infin | number];
export type Strategy = {
  label: string;
  shoppingList: BuyOrder[];
}
