import { draw, playTurn } from "./playTurn";
import { BaseCards, SimFunction, TurnState } from "./types";
import { shuffle } from "./util";

function simGame(cb: SimFunction, log: boolean): TurnState {
  const deck = [
    BaseCards.Estate, BaseCards.Estate, BaseCards.Estate,
    BaseCards.Copper, BaseCards.Copper, BaseCards.Copper, BaseCards.Copper, BaseCards.Copper, BaseCards.Copper, BaseCards.Copper,
  ];
  const state: TurnState = {
    actions: 0,
    buys: 0,
    money: 0,
    deck: shuffle(deck),
    discard: [],
    hand: [],
    play: [],
    gained: [],
    turnNum: 0,
  };

  while (state.gained.filter(c => c === BaseCards.Province).length < 5) {
    // turn start
    draw(state);
    draw(state);
    draw(state);
    draw(state);
    draw(state);
    state.actions = 1;
    state.buys = 1;
    state.money = 0;
    state.turnNum++;

    // play turn
    playTurn(state);

    // buy cards
    if (log) console.log(state);
    const gains = [];
    while (state.buys > 0) {
      state.buys--;
      const toGain = cb(state);
      if (toGain) {
        // todo track buys and money
        gains.push(toGain);
      }
    }
    state.discard.push(...gains);
    state.gained.push(...gains);

    // end turn
    state.discard.push(...state.hand, ...state.play);
    state.hand = [];
    state.play = [];
  }
  if (log) console.log('done');
  return state;
}

export function sim(count: number, logFirst: boolean, cb: SimFunction) {
  const turns: number[] = [];
  for (let i = 0; i < count; i++) {
    turns.push(simGame(cb, logFirst && i === 0).turnNum);
  }
  const avg = turns.reduce((sum, cur) => sum + cur, 0) / count;
  return avg;
}
