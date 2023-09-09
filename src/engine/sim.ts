import { Card } from "../cards";
import { DefaultMap } from "../shared/DefaultMap";
import { BasicCards, DeckSummary, GameOutcome, GameRecord, GameState, Simulation, Strategy, TurnSummary } from "../shared/types";
import { range } from "../shared/util";
import { totalVP } from "./helpers";
import { Player } from "./player";

function simGame(strategies: Strategy[], log: boolean, iteration = 0): GameRecord[] {
  const state: GameState = {
    supply: DefaultMap.empty(c => Card.get(c).startingSupply(strategies.length)),
    trash: [],
  };
  const players = strategies.map(s => Player.new(state, s, log));

  let index = iteration;
  while (state.supply.get(BasicCards.Province) > 0 && players[0].state.turnNum < 98) {
    players[index % players.length].playTurn();
    index++
  }

  const maxVP = Math.max(...players.map(p => totalVP(p.state)));
  const numWinners = players.filter(p => totalVP(p.state) === maxVP).length;
  const winState = numWinners === 1 ? GameOutcome.Win : GameOutcome.Draw;
  return players.map(p => ({
    outcome: totalVP(p.state) === maxVP ? winState : GameOutcome.Lose,
    state: p.state,
    turns: p.turnHistory.toArray(),
  }));
}

function summarizePlayer(records: GameRecord[]): DeckSummary {
  return {
    outcomes: {
      win: records.filter(r => r.outcome === GameOutcome.Win).length,
      lose: records.filter(r => r.outcome === GameOutcome.Lose).length,
      draw: records.filter(r => r.outcome === GameOutcome.Draw).length,
    },
    turns: range(Math.max(...records.map(r => r.turns.length))).map<TurnSummary>(i => {
      const turnRecords = records.map(r => r.turns.getLatest(i));
      return {
        records: turnRecords.length,
        avgMoney: turnRecords.map(r => r.money).average(),
        avgVpTotal: turnRecords.map(r => r.vpTotal).average(),
      };
    }),
  }
}

export function simGames(count: number, logFirst: boolean, strategies: Strategy[]): Simulation {
  const records: GameRecord[][] = [];
  for (let i = 0; i < count; i++) {
    const game = simGame(strategies, logFirst && i === 0);
    records.push(game);
  }

  const players = records.reduce<GameRecord[][]>((arr, game) => {
    game.forEach((record, ri) => {
      arr[ri] = (arr[ri] ?? []).concat(record);
    });
    return arr;
  }, []);

  return {
    games: count,
    decks: strategies.map((strat, si) => ({
      label: strat.label,
      shoppingList: strat.shoppingList,
      summary: summarizePlayer(players[si]),
    })),
  };
}
