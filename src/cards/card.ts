import { BasicCards, CardID, CardProperties, CardType, GameState, PlayEffects, PlayerState } from "../shared/types";

export class Card {
  constructor(
    readonly props: CardProperties,
  ) {
    Card.cache.set(props.id, this);
  }

  // helpers
  isType(type: CardType) {
    return this.props.types.includes(type);
  }
  startingSupply(numPlayers: number): number {
    if (this.props.id in [BasicCards.Gold, BasicCards.Silver, BasicCards.Copper]) {
      return 99;
    }
    if (this.props.id in [BasicCards.Curse]) {
      return Math.max(10, (numPlayers - 1) * 10);
    }
    if (this.isType(CardType.Victory)) {
      return {
        2: 8,
        3: 12,
        4: 12,
        5: 16,
      }[numPlayers] ?? 8;
    }
    // else
    return 10;
  }

  get defaultEffects(): Required<PlayEffects> {
    return {
      actions: 0,
      draw: 0,
      discardAfterDraw: 0,
      buys: 0,
      money: 0,
      vpChips: 0,
      gainToHand: [],
      trashFromHand: [],
      opponentsDraw: 0,
    };
  }
  onPlay(player: PlayerState, game: GameState): Required<PlayEffects> {
    return {
      ...this.defaultEffects,
      ...(this.props.onPlay ? this.props.onPlay(player, game) : {}),
    };
  }

  private static cache = new Map<CardID, Card>();
  static get(id: CardID): Card {
    const card = this.cache.get(id);
    if (!card) { throw new Error('card does not exist: ' + id)};
    return card;
  }
  static getAll(): Card[] {
    return Array.from(this.cache.values()).sortBy(c => c.props.id);
  }
}
