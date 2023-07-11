import { BasicCards, BaseSet, CardProperties, CardType, PlayerState } from "../types";
import { Card, totalTreasure } from "./card";

const simpleCards: CardProperties[] = [{
  id: BaseSet.Laboratory,
  cost: 5,
  types: [CardType.Action],
  onPlay: () => ({ draw: 2, actions: 1 }),
}, {
  id: BaseSet.Market,
  cost: 5,
  types: [CardType.Action],
  onPlay: () => ({ draw: 1, actions: 1, money: 1, buys: 1 }),
}, {
  id: BaseSet.Chapel,
  cost: 2,
  types: [CardType.Action],
  onPlay: (player: PlayerState) => {
    // only trash while you can still afford a silver
    const howManyCopperToTrash = totalTreasure(player) - 3;
    return {
      trashFromHand: [
        ...player.hand.filter(c => c === BasicCards.Curse),
        ...player.hand.filter(c => c === BasicCards.Estate),
        ...player.hand.filter(c => c === BasicCards.Copper).slice(howManyCopperToTrash),
      ].slice(0, 4),
    };
  },
}, {
  id: BaseSet.Moneylender,
  cost: 4,
  types: [CardType.Action],
  onPlay: (player: PlayerState) => {
    if (player.hand.includes(BasicCards.Copper)) {
      return {
        money: 3,
        trashFromHand: [BasicCards.Copper],
      };
    }
    return {};
  },
}, {
  id: BaseSet.Festival,
  cost: 5,
  types: [CardType.Action],
  onPlay: () => ({ actions: 2, money: 2, buys: 1 }),
}, {
  id: BaseSet.Smithy,
  cost: 4,
  types: [CardType.Action],
  onPlay: () => ({ draw: 3, }),
}, {
  id: BaseSet.Village,
  cost: 3,
  types: [CardType.Action],
  onPlay: () => ({ draw: 1, actions: 2 }),
}];

export const AllBaseSet = simpleCards.map(p => new Card(p));
