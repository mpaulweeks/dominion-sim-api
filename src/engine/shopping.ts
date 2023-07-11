import { Card } from "../cards";
import { ActiveTurnState, BuyOrder, CardID, Infin, PlayerState } from "../types";
import { toCount } from "../util";

export class ShoppingList {
  constructor(readonly buyOrders: BuyOrder[]) {}

  determineBuy(player: PlayerState, turn: ActiveTurnState): CardID | undefined {
    const inventory = toCount(player.gainHistory);
    for (const [id, num] of this.buyOrders) {
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
  }
}
