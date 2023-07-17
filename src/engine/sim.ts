import { BasicCards, PlayerState, Strategy, TurnSnapshot } from "../shared/types";
import { average, range } from "../shared/util";
import { Player } from "./player";

type GameRecord = {
  state: PlayerState;
  turns: TurnSnapshot[];
}

function simGame(strategy: Strategy, log: boolean): GameRecord {
  const player = Player.new(strategy, log);

  while (player.state.gainHistory.match(BasicCards.Province).length < 5) {
    player.playTurn();
  }

  return {
    state: player.state,
    turns: player.turnHistory.toArray(),
  };
}

export function simBuy(count: number, logFirst: boolean, strategy: Strategy) {
  const records: GameRecord[] = [];
  for (let i = 0; i < count; i++) {
    const game = simGame(strategy, logFirst && i === 0);
    records.push(game);
  }

  return {
    totalTurns: average(records.map(r => r.state.turnNum)),
    turns: range(Math.max(...records.map(r => r.turns.length))).map(i => ({
      money: average(records.map(r => r.turns[i]?.money).filter(n => n !== undefined)),
      vpTotal: average(records.map(r => r.turns[i]?.vpTotal).filter(n => n !== undefined)),
    })),
  }
}
