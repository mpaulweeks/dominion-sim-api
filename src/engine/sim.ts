import { BasicCards, PlayerState, Strategy } from "../types";
import { Player } from "./player";

function simGame(strategy: Strategy, log: boolean): PlayerState {
  const player = Player.new(strategy, log);

  while (player.state.gained.match(BasicCards.Province).length < 5) {
    player.playTurn();
  }

  return player.state;
}

export function simBuy(count: number, logFirst: boolean, strategy: Strategy) {
  const turns: number[] = [];
  for (let i = 0; i < count; i++) {
    turns.push(simGame(strategy, logFirst && i === 0).turnNum);
  }
  const avg = turns.reduce((sum, cur) => sum + cur, 0) / count;
  return avg;
}
