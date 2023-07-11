import { BasicCards, CardProperties, CardType } from "../types";
import { Card } from "./card";

const basicCardProps: CardProperties[] = [{
  id: BasicCards.Gold,
  cost: 6,
  types: [CardType.Treasure],
  onPlay: () => ({ money: 3, }),
}, {
  id: BasicCards.Silver,
  cost: 3,
  types: [CardType.Treasure],
  onPlay: () => ({ money: 2, }),
}, {
  id: BasicCards.Copper,
  cost: 0,
  types: [CardType.Treasure],
  onPlay: () => ({ money: 1, }),
}, {
  id: BasicCards.Province,
  cost: 8,
  types: [CardType.Victory],
  vp: 6,
}, {
  id: BasicCards.Duchy,
  cost: 5,
  types: [CardType.Victory],
  vp: 3,
}, {
  id: BasicCards.Estate,
  cost: 2,
  types: [CardType.Victory],
  vp: 1,
}, {
  id: BasicCards.Curse,
  cost: 0,
  types: [CardType.Curse],
  vp: -1,
}];

export const AllBasicCards = basicCardProps.map(p => new Card(p));
