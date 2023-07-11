import { types } from "util";
import { Card } from "../cards";
import { ActiveTurnState, BasicCards, BaseSet, CardID, CardType, PlayerState, SimFunction } from "../types";
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

  private playCard(turn: ActiveTurnState, id: CardID) {
    const { state } = this;
    state.hand = removeFirst(state.hand, id);
    state.play.push(id);

    const card = Card.get(id);
    const effects = card.onPlay(state);

    if (card.props.types.includes(CardType.Action)) {
      turn.actions--;
    }
    turn.actions += effects.actions;
    turn.buys += effects.buys;
    turn.money += effects.money;
    effects.trashFromHand.forEach(toTrash => {
      state.hand = removeFirst(state.hand, toTrash);
      state.trashed.push(toTrash);
    });
    range(effects.draw).forEach(() => this.draw());
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
    const { state } = this;
    while (turn.actions > 0) {
      const actions = state.hand
        .map(c => Card.get(c))
        .filter(c => c.props.types.includes(CardType.Action))
        .sortBy(c => c.onPlay(state).actions)
        .reverse();

      const next = actions[0];
      if (!next) { break; }

      this.playCard(turn, next.props.id);
    }
  }
  private playTreasure(turn: ActiveTurnState) {
    const { state } = this;
    const card = (
      (state.hand.includes(BasicCards.Gold) && BasicCards.Gold) ||
      (state.hand.includes(BasicCards.Silver) && BasicCards.Silver) ||
      (state.hand.includes(BasicCards.Copper) && BasicCards.Copper) ||
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
        ...repeat(BasicCards.Estate, 3),
        ...repeat(BasicCards.Copper, 7),
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
