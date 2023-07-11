import { CardID, CardProperties, CardType, PlayEffects, PlayerState } from "../types";

export function totalTreasure(player: PlayerState) {
  return [
    ...player.deck,
    ...player.discard,
    ...player.hand,
    ...player.play,
  ].map(c => Card.get(c))
  .filter(c => c.isType(CardType.Treasure))
  .map(c => c.onPlay(player).money)
  .reduce((sum, cur) => sum + cur, 0);
}

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

  get defaultEffects(): Required<PlayEffects> {
    return {
      actions: 0,
      draw: 0,
      buys: 0,
      money: 0,
      vp: 0,
      trashFromHand: [],
    };
  }
  onPlay(player: PlayerState): Required<PlayEffects> {
    return {
      ...this.defaultEffects,
      ...(this.props.onPlay ? this.props.onPlay(player) : {}),
    };
  }

  private static cache = new Map<CardID, Card>();
  static get(id: CardID): Card {
    const card = this.cache.get(id);
    if (!card) { throw new Error('card does not exist: ' + id)};
    return card;
  }
}
