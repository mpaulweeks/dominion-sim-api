import { CardID, CardProperties, PlayEffects, PlayerState } from "../types";

export class Card {
  constructor(
    readonly props: CardProperties,
  ) {
    Card.cache.set(props.id, this);
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
