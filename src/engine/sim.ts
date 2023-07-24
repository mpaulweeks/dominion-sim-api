import { Card } from "../cards";
import { DefaultMap } from "../shared/DefaultMap";
import { BasicCards, GameState, PlayerState, Strategy, TurnSnapshot } from "../shared/types";
import { range } from "../shared/util";
import { Player } from "./player";

type GameRecord = {
  state: PlayerState;
  turns: TurnSnapshot[];
}

function simGame(strategies: Strategy[], log: boolean): GameRecord[] {
  const state: GameState = {
    supply: DefaultMap.empty(c => Card.get(c).startingSupply(strategies.length)),
    trash: [],
  };
  const players = strategies.map(s => Player.new(state, s, log));

  while (state.supply.get(BasicCards.Province) > 0) {
    players.forEach(p => p.playTurn());
  }

  return players.map(p => ({
    state: p.state,
    turns: p.turnHistory.toArray(),
  }));
}

export function simBuy(count: number, logFirst: boolean, strategy: Strategy) {
  const records: GameRecord[] = [];
  for (let i = 0; i < count; i++) {
    const game = simGame([strategy], logFirst && i === 0);
    records.push(game[0]);
  }

  return {
    totalTurns: records.map(r => r.state.turnNum).average(),
    turns: range(Math.max(...records.map(r => r.turns.length))).map(i => ({
      money: records.map(r => r.turns[i]?.money).filter(n => n !== undefined).average(),
      vpTotal: records.map(r => r.turns[i]?.vpTotal).filter(n => n !== undefined).average(),
    })),
  }
}
