import { totalTreasure } from "../engine/helpers";
import { BasicCards, BaseSet, CardProperties, CardType, PlayerState } from "../shared/types";
import { Card } from "./card";

const simpleCards: Omit<CardProperties, 'setIndex' | 'setName'>[] = [{
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
  onPlay: player => {
    // only trash while you can still afford a silver
    const howManyCopperToTrash = totalTreasure(player) - 3;
    return {
      trashFromHand: [
        ...player.hand.match(BasicCards.Curse),
        ...player.hand.match(BasicCards.Estate),
        ...player.hand.match(BasicCards.Copper).slice(howManyCopperToTrash),
      ].slice(0, 4),
    };
  },
}, {
  id: BaseSet.CouncilRoom,
  cost: 5,
  types: [CardType.Action],
  onPlay: () => ({
    draw: 4,
    buys: 1,
    opponentsDraw: 1,
  }),
}, {
  id: BaseSet.Festival,
  cost: 5,
  types: [CardType.Action],
  onPlay: () => ({ actions: 2, money: 2, buys: 1 }),
}, {
  id: BaseSet.Library,
  cost: 5,
  types: [CardType.Action],
  onPlay: player => ({
    // todo skip actions
    draw: Math.max(0, 7 - (player.hand.length - 1)),
  }),
}, {
  id: BaseSet.Mine,
  cost: 5,
  types: [CardType.Action],
  onPlay: player => {
    if (player.hand.includes(BasicCards.Silver)) {
      return {
        gainToHand: [BasicCards.Gold],
        trashFromHand: [BasicCards.Silver],
      };
    }
    if (player.hand.includes(BasicCards.Copper)) {
      return {
        gainToHand: [BasicCards.Silver],
        trashFromHand: [BasicCards.Copper],
      };
    }
    return {};
  },
}, {
  id: BaseSet.Moneylender,
  cost: 4,
  types: [CardType.Action],
  onPlay: player => {
    if (player.hand.includes(BasicCards.Copper)) {
      return {
        money: 3,
        trashFromHand: [BasicCards.Copper],
      };
    }
    return {};
  },
}, {
  id: BaseSet.Poacher,
  cost: 4,
  types: [CardType.Action],
  onPlay: () => ({
    actions: 1,
    draw: 1,
    money: 1,
    // todo check piles
    discardAfterDraw: 1,
  }),
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

export const AllBaseSet = simpleCards.map(p => new Card({
  ...p,
  setIndex: 1,
  setName: 'Base Set v2',
}));
