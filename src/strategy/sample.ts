import { BasicCards, BaseSet, SimFunction, CardID, BuyOrder, Infin } from "../engine";

export type Strategy = {
  label: string;
  shoppingList: BuyOrder[];
}

export const SampleStrategies: Strategy[] = [{
  label: 'BigMoney',
  shoppingList: [
    [BasicCards.Province, Infin ],
    [BasicCards.Gold, Infin ],
    [BasicCards.Silver, Infin ],
  ],
}, {
  label: 'SmithyBigMoney',
  shoppingList: [
    [BasicCards.Province, Infin ],
    [BasicCards.Gold, Infin ],
    [BaseSet.Smithy, 2 ],
    [BasicCards.Silver, Infin ],
  ],
}, {
  label: 'LabBigMoney',
  shoppingList: [
    [BasicCards.Province, Infin ],
    [BasicCards.Gold, Infin ],
    [BaseSet.Laboratory, Infin ],
    [BasicCards.Silver, Infin ],
  ],
}, {
  label: 'MarketBigMoney',
  shoppingList: [
    [BasicCards.Province, Infin ],
    [BasicCards.Gold, Infin ],
    [BaseSet.Market, Infin ],
    [BasicCards.Silver, Infin ],
  ],
}, {
  label: 'VillageSmithy',
  shoppingList: [
    [BasicCards.Province, Infin ],
    [BasicCards.Gold, Infin ],
    [BaseSet.Smithy, 2 ],
    [BasicCards.Silver, 2 ],
    [BaseSet.Village, 1 ],
    [BaseSet.Smithy, 1 ],
    [BaseSet.Village, 1 ],
    [BaseSet.Smithy, 1 ],
    [BaseSet.Village, 1 ],
    [BaseSet.Smithy, 1 ],
    [BaseSet.Village, 1 ],
    [BasicCards.Silver, Infin ],
  ],
}, {
  label: 'Chapel',
  shoppingList: [
    [BaseSet.Chapel, 1 ],
    [BasicCards.Province, Infin ],
    [BasicCards.Gold, Infin ],
    [BasicCards.Silver, Infin ],
  ],
}, {
  label: 'ChapelLab',
  shoppingList: [
    [BaseSet.Chapel, 1 ],
    [BasicCards.Province, Infin ],
    [BasicCards.Gold, Infin ],
    [BaseSet.Laboratory, Infin ],
    [BasicCards.Silver, Infin ],
  ],
}];
