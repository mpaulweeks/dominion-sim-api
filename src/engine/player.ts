import { ActiveTurnState, BaseCards, BaseSet, CardID, PlayerState, SimFunction } from "./types";
import { range, removeFirst, repeat, shuffle } from "../util";

export class Player {
  constructor(
    readonly state: PlayerState,
    readonly strategy: SimFunction,
  ) {};

  drawFive() {
    range(5).forEach(() => this.draw());
  }
  draw() {
    const { state } = this;
    if (state.deck.length === 0) {
      if (state.discard.length === 0) { return; }
      state.deck.push(...shuffle(state.discard));
      state.discard = [];
    }
    state.hand.push(state.deck.pop()!);
  }

  private playCard(turn: ActiveTurnState, card: CardID) {
    const { state } = this;
    state.hand = removeFirst(state.hand, c => c === card);
    state.play.push(card);

    if (card === BaseCards.Gold) turn.money += 3;
    if (card === BaseCards.Silver) turn.money += 2;
    if (card === BaseCards.Copper) turn.money += 1;
    if (card === BaseSet.Smithy) {
      turn.actions--;
      this.draw();
      this.draw();
      this.draw();
    }
    if (card === BaseSet.Village) {
      turn.actions++;
      this.draw();
    }
  }

  playTurn() {
    this.state.turnNum++;
    const turn: ActiveTurnState = {
      actions: 1,
      buys: 1,
      money: 0,
    };

    this.playActions(turn);
    this.playTreasure(turn);
    this.playBuy(turn);
    this.playCleanup();
  }
  private playActions(turn: ActiveTurnState) {
    if (turn.actions === 0) { return; }

    const { state } = this;
    const card = (
      (state.hand.includes(BaseSet.Village) && BaseSet.Village) ||
      (state.hand.includes(BaseSet.Smithy) && BaseSet.Smithy) ||
      undefined
    );
    if (card) {
      // update state
      this.playCard(turn, card);
      // go again
      this.playActions(turn);
    }
  }
  private playTreasure(turn: ActiveTurnState) {
    const { state } = this;
    const card = (
      (state.hand.includes(BaseCards.Gold) && BaseCards.Gold) ||
      (state.hand.includes(BaseCards.Silver) && BaseCards.Silver) ||
      (state.hand.includes(BaseCards.Copper) && BaseCards.Copper) ||
      undefined
    );
    if (card) {
      // update state
      this.playCard(turn, card);
      // go again
      this.playTreasure(turn);
    }
  }
  private playBuy(turn: ActiveTurnState) {
    const { state } = this;
    const gains = [];
    while (turn.buys > 0) {
      turn.buys--;
      const toGain = this.strategy(state, turn);
      if (toGain) {
        // todo track buys and money
        gains.push(toGain);
      }
    }
    state.discard.push(...gains);
    state.gained.push(...gains);
  }
  private playCleanup() {
    const { state } = this;
    state.discard.push(...state.hand, ...state.play);
    state.hand = [];
    state.play = [];
    this.drawFive();
  }

  static new(strategy: SimFunction) {
    const p = new Player({
      turnNum: 0,
      deck: [],
      discard: [
        ...repeat(BaseCards.Estate, 3),
        ...repeat(BaseCards.Copper, 7),
      ],
      hand: [],
      play: [],
      gained: [],
      trashed: [],
    }, strategy);
    p.drawFive();
    return p;
  }
}
