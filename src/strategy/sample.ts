import { BasicCards, BaseSet, SimFunction, CardID } from "../engine";

const Infinity = '∞';
type BuyOrder = [CardID, typeof Infinity | number];

export type Strategy = {
  label: string;
  cb: SimFunction;
  buyOrders?: BuyOrder[];
}

export const SampleStrategies: Strategy[] = [{
  label: 'BigMoney',
  cb: (player, turn) => {
    const { money } = turn;
    if (money >= 8) return BasicCards.Province;
    if (money >= 6) return BasicCards.Gold;
    if (money >= 3) return BasicCards.Silver;
    // else buy nothing
  },
  buyOrders: [
    [BasicCards.Province, Infinity ],
    [BasicCards.Gold, Infinity ],
    [BasicCards.Silver, Infinity ],
  ],
}, {
  label: 'SmithyBigMoney',
  cb: (player, turn) => {
    const { money } = turn;
    const smithy = player.gained.match(BaseSet.Smithy).length;
    if (money >= 8) return BasicCards.Province;
    if (money >= 6) return BasicCards.Gold;
    // if less than 2 smithy in deck
    if (money >= 4 && smithy < 10 && smithy < 2) return BaseSet.Smithy;
    // pick up a 3rd smithy after turn 10
    if (money >= 4 && smithy < 10 && smithy < 3 && player.turnNum > 10) return BaseSet.Smithy;
    if (money >= 3) return BasicCards.Silver;
  },
  buyOrders: [
    [BasicCards.Province, Infinity ],
    [BasicCards.Gold, Infinity ],
    [BaseSet.Smithy, 2 ],
    [BasicCards.Silver, Infinity ],
  ],
}, {
  label: 'LabBigMoney',
  cb: (player, turn) => {
    const { money } = turn;
    if (money >= 8) return BasicCards.Province;
    if (money >= 6) return BasicCards.Gold;
    if (money >= 5) return BaseSet.Laboratory;
    if (money >= 3) return BasicCards.Silver;
  },
  buyOrders: [
    [BasicCards.Province, Infinity ],
    [BasicCards.Gold, Infinity ],
    [BaseSet.Laboratory, Infinity ],
    [BasicCards.Silver, Infinity ],
  ],
}, {
  label: 'MarketBigMoney',
  cb: (player, turn) => {
    const { money } = turn;
    if (money >= 8) return BasicCards.Province;
    if (money >= 6) return BasicCards.Gold;
    if (money >= 5) return BaseSet.Market;
    if (money >= 3) return BasicCards.Silver;
  },
  buyOrders: [
    [BasicCards.Province, Infinity ],
    [BasicCards.Gold, Infinity ],
    [BaseSet.Market, Infinity ],
    [BasicCards.Silver, Infinity ],
  ],
}, {
  label: 'VillageSmithy',
  cb: (player, turn) => {
    const { money } = turn;
    const smithy = player.gained.match(BaseSet.Smithy).length;
    const village = player.gained.match(BaseSet.Village).length;
    if (money >= 8) return BasicCards.Province;
    if (money >= 6) return BasicCards.Gold;
    // buy up to 5 smithy, but only if you have comparable villages
    if (money >= 4 && smithy < 5 && smithy <= village + 1) return BaseSet.Smithy;
    // buy up to 5 villages, but only while you have more smithy
    if (money >= 3 && village < 5 && smithy > village + 1) return BaseSet.Village;
    if (money >= 3) return BasicCards.Silver;
  },
  buyOrders: [
    [BasicCards.Province, Infinity ],
    [BasicCards.Gold, Infinity ],
    [BaseSet.Smithy, 2 ],
    [BasicCards.Silver, 2 ],
    [BaseSet.Village, 1 ],
    [BaseSet.Smithy, 1 ],
    [BaseSet.Village, 1 ],
    [BaseSet.Smithy, 1 ],
    [BaseSet.Village, 1 ],
    [BaseSet.Smithy, 1 ],
    [BaseSet.Village, 1 ],
    [BasicCards.Silver, Infinity ],
  ],
}, {
  label: 'Chapel',
  cb: (player, turn) => {
    const { money } = turn;
    const chapel = player.gained.match(BaseSet.Chapel).length;
    if (money >= 2 && chapel < 1) return BaseSet.Chapel;
    if (money >= 8) return BasicCards.Province;
    if (money >= 6) return BasicCards.Gold;
    if (money >= 3) return BasicCards.Silver;
  },
  buyOrders: [
    [BaseSet.Chapel, 1 ],
    [BasicCards.Province, Infinity ],
    [BasicCards.Gold, Infinity ],
    [BasicCards.Silver, Infinity ],
  ],
}, {
  label: 'ChapelLab',
  cb: (player, turn) => {
    const { money } = turn;
    const chapel = player.gained.match(BaseSet.Chapel).length;
    if (money >= 2 && chapel < 1) return BaseSet.Chapel;
    if (money >= 8) return BasicCards.Province;
    if (money >= 6) return BasicCards.Gold;
    if (money >= 5) return BaseSet.Laboratory;
    if (money >= 3) return BasicCards.Silver;
  },
  buyOrders: [
    [BaseSet.Chapel, 1 ],
    [BasicCards.Province, Infinity ],
    [BasicCards.Gold, Infinity ],
    [BaseSet.Laboratory, Infinity ],
    [BasicCards.Silver, Infinity ],
  ],
}];
