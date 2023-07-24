import { DefaultMap } from "../shared/DefaultMap";
import { Card } from "../cards";
import { ActiveTurnState, BuyOrder, CardID, GameState, Infin, PlayerState } from "../shared/types";

export class ShoppingList {
  constructor(readonly buyOrders: BuyOrder[]) {}

  determineBuy(game: GameState, player: PlayerState, turn: ActiveTurnState): CardID | undefined {
    const inventory = new DefaultMap(
      player.gainHistory.toCount(),
      () => 0,
    );
    for (const [id, num] of this.buyOrders) {
      // any in the supply?
      if (game.supply.get(id) === 0) { continue; }

      // can we afford it?
      const card = Card.get(id);
      if (card.props.cost > turn.money) { continue; }

      const demand = num === Infin ? Infinity : num;
      if (demand > inventory.get(id)) {
        return id;
      } else {
        inventory.transform(id, val => val - demand);
        continue;
      }
    }
  }
}
