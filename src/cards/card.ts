import { CardID, CardProperties } from "../types";

export class Card {
  constructor(
    readonly props: CardProperties,
  ) {
    Card.cache.set(props.id, this);
  }

  private static cache = new Map<CardID, Card>();
  static get(id: CardID): Card {
    const card = this.cache.get(id);
    if (!card) { throw new Error('card does not exist: ' + id)};
    return card;
  }
}
