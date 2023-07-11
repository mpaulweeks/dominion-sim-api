import { BaseCards, CardProperties, CardType } from "../types";
import { Card } from "./card";

const baseCardProps: CardProperties[] = [{
  id: BaseCards.Gold,
  cost: 6,
  types: [CardType.Treasure],
  basicEffects: { money: 3, },
}, {
  id: BaseCards.Silver,
  cost: 3,
  types: [CardType.Treasure],
  basicEffects: { money: 2, },
}, {
  id: BaseCards.Copper,
  cost: 0,
  types: [CardType.Treasure],
  basicEffects: { money: 1, },
}, {
  id: BaseCards.Province,
  cost: 8,
  types: [CardType.Victory],
  basicEffects: { vp: 6, },
}, {
  id: BaseCards.Duchy,
  cost: 5,
  types: [CardType.Victory],
  basicEffects: { vp: 3, },
}, {
  id: BaseCards.Estate,
  cost: 2,
  types: [CardType.Victory],
  basicEffects: { vp: 1, },
}, {
  id: BaseCards.Curse,
  cost: 0,
  types: [CardType.Curse],
  basicEffects: { vp: -1, },
}];

export const AllBaseCards = baseCardProps.map(p => new Card(p));
