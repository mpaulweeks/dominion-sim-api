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
  readonly gainHistory: CardID[];
  readonly trashHistory: CardID[];
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
export type PlayEffects = {
  actions?: number;
  draw?: number;
  buys?: number;
  money?: number;
  vp?: number;
  trashFromHand?: CardID[];
};

export type CardProperties = {
  id: CardID;
  cost: number;
  types: CardType[];
  vp?: number;
  onPlay?: (player: PlayerState) => PlayEffects;
}

export const Infin = '∞';
export type BuyOrder = [CardID, typeof Infin | number];
export type Strategy = {
  label: string;
  shoppingList: BuyOrder[];
}
