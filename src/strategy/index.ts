import { BaseCards, BaseSet, SimFunction } from "../engine";

export const BigMoney: SimFunction = (player, turn) => {
  const { money } = turn;
  if (money >= 8) return BaseCards.Province;
  if (money >= 6) return BaseCards.Gold;
  if (money >= 3) return BaseCards.Silver;
  // else buy nothing
};

export const SmithyBigMoney: SimFunction = (player, turn) => {
  const { money } = turn;
  const smithy = player.gained.filter(c => c === BaseSet.Smithy).length;
  if (money >= 8) return BaseCards.Province;
  if (money >= 6) return BaseCards.Gold;
  // if less than 2 smithy in deck
  if (money >= 4 && smithy < 10 && smithy < 2) return BaseSet.Smithy;
  // pick up a 3rd smithy after turn 10
  if (money >= 4 && smithy < 10 && smithy < 3 && player.turnNum > 10) return BaseSet.Smithy;
  if (money >= 3) return BaseCards.Silver;
};

export const VillageSmithy: SimFunction = (player, turn) => {
  const { money } = turn;
  const smithy = player.gained.filter(c => c === BaseSet.Smithy).length;
  const village = player.gained.filter(c => c === BaseSet.Village).length;
  if (money >= 8) return BaseCards.Province;
  if (money >= 6) return BaseCards.Gold;
  // buy up to 5 smithy, but only if you have comparable villages
  if (money >= 4 && smithy < 5 && smithy <= village + 1) return BaseSet.Smithy;
  // buy up to 5 villages, but only while you have more smithy
  if (money >= 3 && village < 5 && smithy > village + 1) return BaseSet.Village;
  if (money >= 3) return BaseCards.Silver;
};
