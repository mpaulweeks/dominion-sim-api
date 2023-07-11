import { BasicCards, PlayerState, SimFunction } from "../types";
import { Player } from "./player";

function simGame(cb: SimFunction, log: boolean): PlayerState {
  const player = Player.new(cb, log);

  while (player.state.gained.match(BasicCards.Province).length < 5) {
    player.playTurn();
  }

  return player.state;
}

export function sim(count: number, logFirst: boolean, cb: SimFunction) {
  const turns: number[] = [];
  for (let i = 0; i < count; i++) {
    turns.push(simGame(cb, logFirst && i === 0).turnNum);
  }
  const avg = turns.reduce((sum, cur) => sum + cur, 0) / count;
  return avg;
}
