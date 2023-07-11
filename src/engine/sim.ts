import { Card } from "../cards";
import { BasicCards, BuyOrder, Infin, PlayerState, SimFunction } from "../types";
import { toCount } from "../util";
import { Player } from "./player";

function wrapBuyOrders(buyOrders: BuyOrder[]): SimFunction {
  return (player, turn) => {
    const inventory = toCount(player.gained);
    for (const [id, num] of buyOrders) {
      // can we afford it?
      const card = Card.get(id);
      if (card.props.cost > turn.money) { continue; }

      const demand = num === Infin ? Infinity : num;
      if (demand > inventory.get(id)) {
        return id;
      } else {
        inventory.subtract(id, demand);
        continue;
      }
    }
  };
}

function simBuyOrder(buyOrders: BuyOrder[], log: boolean): PlayerState {
  const player = Player.new(wrapBuyOrders(buyOrders), log);

  while (player.state.gained.match(BasicCards.Province).length < 5) {
    player.playTurn();
  }

  return player.state;
}

export function simBuy(count: number, logFirst: boolean, bo: BuyOrder[]) {
  const turns: number[] = [];
  for (let i = 0; i < count; i++) {
    turns.push(simBuyOrder(bo, logFirst && i === 0).turnNum);
  }
  const avg = turns.reduce((sum, cur) => sum + cur, 0) / count;
  return avg;
}
