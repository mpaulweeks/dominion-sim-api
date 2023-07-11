import { BaseSet, CardProperties, CardType } from "../types";
import { Card } from "./card";

const simpleCards: CardProperties[] = [{
  id: BaseSet.Smithy,
  cost: 4,
  types: [CardType.Action],
  basicEffects: { draw: 3, },
}, {
  id: BaseSet.Village,
  cost: 3,
  types: [CardType.Action],
  basicEffects: { draw: 1, actions: 2 },
}];

export const AllBaseSet = simpleCards.map(p => new Card(p));
