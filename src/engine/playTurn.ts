import { BaseCards, BaseSet, Card, TurnState } from "./types";
import { shuffle, removeFirst, } from './util';

function playCard(state: TurnState, card: Card) {
  state.hand = removeFirst(state.hand, c => c === card);
  state.play.push(card);

  if (card === BaseCards.Gold) state.money += 3;
  if (card === BaseCards.Silver) state.money += 2;
  if (card === BaseCards.Copper) state.money += 1;
  if (card === BaseSet.Smithy) {
    state.actions--;
    draw(state);
    draw(state);
    draw(state);
  }
  if (card === BaseSet.Village) {
    state.actions++;
    draw(state);
  }
}

export function playTurn(state: TurnState) {
  let card: Card | undefined;
  if (state.actions > 0) {
    card = (
      (state.hand.includes(BaseSet.Village) && BaseSet.Village) ||
      (state.hand.includes(BaseSet.Smithy) && BaseSet.Smithy) ||
      undefined
    );
  }
  if (card === undefined) {
    card = (
      (state.hand.includes(BaseCards.Gold) && BaseCards.Gold) ||
      (state.hand.includes(BaseCards.Silver) && BaseCards.Silver) ||
      (state.hand.includes(BaseCards.Copper) && BaseCards.Copper) ||
      undefined
    );
  }
  if (card) {
    // update state
    playCard(state, card);
    // go again
    playTurn(state);
  }
}

export function draw(state: TurnState) {
  if (state.deck.length === 0) {
    if (state.discard.length === 0) { return; }
    state.deck.push(...shuffle(state.discard));
    state.discard = [];
  }
  state.hand.push(state.deck.pop()!);
}
