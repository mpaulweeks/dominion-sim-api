import { Card } from "../cards";
import { ActiveTurnState, BasicCards, CardID, CardType, NewTurnSnapshot, PlayerState, Strategy, TurnSnapshot } from "../types";
import { range, removeFirst, repeat, shuffle } from "../util";
import { totalVP } from "./helpers";
import { HistoryTracker } from "./history";
import { ShoppingList } from "./shopping";

export class Player {
  readonly shoppingList: ShoppingList;
  readonly turnHistory = new HistoryTracker<TurnSnapshot>(NewTurnSnapshot);
  constructor(
    readonly state: PlayerState,
    readonly strategy: Strategy,
    readonly log?: boolean,
  ) {
    this.shoppingList = new ShoppingList(strategy.shoppingList);
  };

  drawFive() {
    range(5).forEach(() => this.draw());
  }
  draw() {
    const { state } = this;
    if (state.deck.length === 0) {
      if (state.discard.length === 0) { return; }
      state.deck.push(...shuffle(state.discard));
      state.discard = [];
      this.turnHistory.latest.shuffles++;
    }
    state.hand.push(state.deck.pop()!);
  }

  private playCard(turn: ActiveTurnState, id: CardID) {
    const { state } = this;
    state.hand = removeFirst(state.hand, id);
    state.play.push(id);

    const card = Card.get(id);
    const effects = card.onPlay(state);

    if (card.isType(CardType.Action)) {
      turn.actions--;
    }
    turn.actions += effects.actions;
    turn.buys += effects.buys;
    turn.money += effects.money;
    effects.trashFromHand.forEach(toTrash => {
      state.hand = removeFirst(state.hand, toTrash);
      state.trashHistory.push(toTrash);
    });
    range(effects.draw).forEach(() => this.draw());
  }

  playTurn() {
    this.state.turnNum++;
    if (this.log) { console.log(this.state); }
    if (this.state.turnNum > 99) {
      console.log(this.state, this.strategy.toString());
      throw new Error('stuck in loop!');
    }

    const snapshot = this.turnHistory.next();
    const turn: ActiveTurnState = {
      actions: 1,
      buys: 1,
      money: 0,
    };

    this.playActions(turn);
    this.playTreasure(turn);
    snapshot.money = turn.money;
    this.playBuy(turn);
    snapshot.vpTotal = totalVP(this.state);
    this.playCleanup();
  }
  private playActions(turn: ActiveTurnState) {
    const { state } = this;
    while (turn.actions > 0) {
      const actions = state.hand
        .map(c => Card.get(c))
        .filter(c => c.isType(CardType.Action))
        .sortBy(c => c.onPlay(state).actions)
        .reverse();

      const next = actions[0];
      if (!next) { break; }

      this.playCard(turn, next.props.id);
    }
  }
  private playTreasure(turn: ActiveTurnState) {
    const { state } = this;
    while (true) {
      const treasures = state.hand
        .map(c => Card.get(c))
        .filter(c => c.isType(CardType.Treasure))

      const next = treasures[0];
      if (!next) { break; }

      this.playCard(turn, next.props.id);
    }
  }
  private playBuy(turn: ActiveTurnState) {
    const { state } = this;
    while (turn.buys > 0) {
      turn.buys--;
      const toGain = this.shoppingList.determineBuy(state, turn);
      if (toGain) {
        const cost = Card.get(toGain).props.cost;
        turn.money -= cost;
        state.discard.push(toGain);
        state.gainHistory.push(toGain);
      }
    }
  }
  private playCleanup() {
    const { state } = this;
    state.discard.push(...state.hand, ...state.play);
    state.hand = [];
    state.play = [];
    this.drawFive();
  }

  static new(strategy: Strategy, log?: boolean) {
    const p = new Player({
      turnNum: 0,
      deck: [],
      discard: [
        ...repeat(BasicCards.Estate, 3),
        ...repeat(BasicCards.Copper, 7),
      ],
      hand: [],
      play: [],
      gainHistory: [],
      trashHistory: [],
    }, strategy, log);
    p.drawFive();
    return p;
  }
}
