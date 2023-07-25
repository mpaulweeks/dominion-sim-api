import { DefaultMap } from "./DefaultMap";

export enum CardType {
  Action = 1,
  Treasure,
  Victory,
  Curse,
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
  ThroneRoom = 'throne_room',
  Bandit = 'bandit',
  CouncilRoom = 'council_room',
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
export type GameState = {
  supply: DefaultMap<CardID, number>;
  trash: CardID[];
}
export type PlayerState = {
  turnNum: number;
  deck: CardID[];
  hand: CardID[];
  discard: CardID[];
  play: CardID[];
  vpChips: number;
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
  discardAfterDraw?: number;
  buys?: number;
  money?: number;
  vpChips?: number;
  gainToHand?: CardID[];
  trashFromHand?: CardID[];
  opponentsDraw?: number;
};
export type CardProperties = {
  id: CardID;
  cost: number;
  types: CardType[];
  vp?: number;
  setIndex?: number;
  setName?: string;
  onPlay?: (player: PlayerState, game: GameState) => PlayEffects;
}

// strategy
export type BuyOrder = {
  card: CardID;
  quantity: number;
}
export type Strategy = {
  label: string;
  shoppingList: BuyOrder[];
}

// sim
export type Simulation = {
  decks: DeckSim[];
}
export type DeckSim = {
  label: string;
  shoppingList: BuyOrder[];
  summary: {
    turns: TurnSummary[];
  };
};
export type TurnSummary = {
  records: number;
  avgMoney: number;
  avgVpTotal: number;
}
