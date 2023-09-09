import { Card } from "../cards";
import { ActiveTurnState, BasicCards, CardID, CardType, GameState, NewTurnSnapshot, PlayerState, Strategy, TurnSnapshot } from "../shared/types";
import { range, repeat } from "../shared/util";
import { totalVP } from "./helpers";
import { HistoryTracker } from "./history";
import { ShoppingList } from "./shopping";

export class Player {
  readonly shoppingList: ShoppingList;
  readonly turnHistory = new HistoryTracker<TurnSnapshot>(NewTurnSnapshot);
  constructor(
    readonly state: PlayerState,
    readonly game: GameState,
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
      state.deck.push(...state.discard.shuffle());
      state.discard = [];
      this.turnHistory.latest.shuffles++;
    }
    state.hand.push(state.deck.pop()!);
  }

  private chooseDiscard(): CardID {
    // todo generically decide value
    const { state } = this;
    const handCards = state.hand.map(Card.get);
    return (
      handCards.filter(c => c.isType(CardType.Treasure))[0]?.props.id ||
      state.hand.match(BasicCards.Curse)[0] ||
      state.hand.match(BasicCards.Copper)[0] ||
      state.hand[0]
    );
  }

  private playCard(turn: ActiveTurnState, id: CardID) {
    const { game, state } = this;
    state.hand = state.hand.removeFirst(id);
    state.play.push(id);

    const card = Card.get(id);
    const effects = card.onPlay(state, game);

    if (card.isType(CardType.Action)) {
      turn.actions--;
    }
    turn.actions += effects.actions;
    turn.buys += effects.buys;
    turn.money += effects.money;
    state.vpChips += effects.vpChips;
    // todo handle opponent draw
    effects.gainToHand.forEach(toGain => this.gain(toGain));
    effects.trashFromHand.forEach(toTrash => {
      state.hand = state.hand.removeFirst(toTrash);
      state.trashHistory.push(toTrash);
    });
    range(effects.draw).forEach(() => this.draw());
    range(effects.discardAfterDraw).forEach(() => {
      const toDiscard = this.chooseDiscard();
      if (toDiscard) {
        state.hand.removeFirst(toDiscard);
        state.discard.push(toDiscard);
      }
    });
  }

  playTurn() {
    this.state.turnNum++;
    if (this.log) { console.log(this.state); }

    const snapshot = this.turnHistory.get(this.state.turnNum);
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
    const { game, state } = this;
    while (turn.actions > 0) {
      const actions = state.hand
        .map(c => Card.get(c))
        .filter(c => c.isType(CardType.Action))
        .sortBy(c => c.onPlay(state, game).actions)
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
    const { game, state } = this;
    while (turn.buys > 0) {
      turn.buys--;
      const toGain = this.shoppingList.determineBuy(game, state, turn);
      if (toGain) {
        const cost = Card.get(toGain).props.cost;
        turn.money -= cost;
        this.gain(toGain);
      }
    }
  }
  private gain(toGain: CardID) {
    const { game, state } = this;
    game.supply.transform(toGain, n => n - 1);
    state.discard.push(toGain);
    state.gainHistory.push(toGain);
  }
  private playCleanup() {
    const { state } = this;
    state.discard.push(...state.hand, ...state.play);
    state.hand = [];
    state.play = [];
    this.drawFive();
  }

  static new(game: GameState, strategy: Strategy, log?: boolean) {
    const p = new Player({
      turnNum: -1,
      deck: [],
      discard: [
        ...repeat(BasicCards.Estate, 3),
        ...repeat(BasicCards.Copper, 7),
      ],
      hand: [],
      play: [],
      gainHistory: [],
      trashHistory: [],
      vpChips: 0,
    }, game, strategy, log);
    p.drawFive();
    return p;
  }
}
