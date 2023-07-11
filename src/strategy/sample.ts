import { BasicCards, BaseSet, SimFunction } from "../engine";

export type Strategy = {
  label: string;
  cb: SimFunction;
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
}, {
  label: 'SmithyBigMoney',
  cb: (player, turn) => {
    const { money } = turn;
    const smithy = player.gained.filter(c => c === BaseSet.Smithy).length;
    if (money >= 8) return BasicCards.Province;
    if (money >= 6) return BasicCards.Gold;
    // if less than 2 smithy in deck
    if (money >= 4 && smithy < 10 && smithy < 2) return BaseSet.Smithy;
    // pick up a 3rd smithy after turn 10
    if (money >= 4 && smithy < 10 && smithy < 3 && player.turnNum > 10) return BaseSet.Smithy;
    if (money >= 3) return BasicCards.Silver;
  },
}, {
  label: 'LabBigMoney',
  cb: (player, turn) => {
    const { money } = turn;
    if (money >= 8) return BasicCards.Province;
    if (money >= 6) return BasicCards.Gold;
    if (money >= 5) return BaseSet.Laboratory;
    if (money >= 3) return BasicCards.Silver;
  },
}, {
  label: 'MarketBigMoney',
  cb: (player, turn) => {
    const { money } = turn;
    if (money >= 8) return BasicCards.Province;
    if (money >= 6) return BasicCards.Gold;
    if (money >= 5) return BaseSet.Market;
    if (money >= 3) return BasicCards.Silver;
  },
}, {
  label: 'VillageSmithy',
  cb: (player, turn) => {
    const { money } = turn;
    const smithy = player.gained.filter(c => c === BaseSet.Smithy).length;
    const village = player.gained.filter(c => c === BaseSet.Village).length;
    if (money >= 8) return BasicCards.Province;
    if (money >= 6) return BasicCards.Gold;
    // buy up to 5 smithy, but only if you have comparable villages
    if (money >= 4 && smithy < 5 && smithy <= village + 1) return BaseSet.Smithy;
    // buy up to 5 villages, but only while you have more smithy
    if (money >= 3 && village < 5 && smithy > village + 1) return BaseSet.Village;
    if (money >= 3) return BasicCards.Silver;
  },
}, {
  label: 'Chapel',
  cb: (player, turn) => {
    const { money } = turn;
    const chapel = player.gained.filter(c => c === BaseSet.Chapel).length;
    if (money >= 2 && chapel < 1) return BaseSet.Chapel;
    if (money >= 8) return BasicCards.Province;
    if (money >= 6) return BasicCards.Gold;
    if (money >= 3) return BasicCards.Silver;
  },
}, {
  label: 'ChapelLab',
  cb: (player, turn) => {
    const { money } = turn;
    const chapel = player.gained.filter(c => c === BaseSet.Chapel).length;
    if (money >= 2 && chapel < 1) return BaseSet.Chapel;
    if (money >= 8) return BasicCards.Province;
    if (money >= 6) return BasicCards.Gold;
    if (money >= 5) return BaseSet.Laboratory;
    if (money >= 3) return BasicCards.Silver;
  },
}];
