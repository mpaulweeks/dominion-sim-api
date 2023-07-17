import { Card } from "../cards";
import { CardType, PlayerState } from "../shared/types";

export function allCards(player: PlayerState) {
  return [
    ...player.deck,
    ...player.discard,
    ...player.hand,
    ...player.play,
  ].map(id => Card.get(id));
};

export function totalTreasure(player: PlayerState) {
  return allCards(player)
    .filter(c => c.isType(CardType.Treasure))
    .map(c => c.onPlay(player).money)
    .reduce((sum, cur) => sum + cur, 0);
}


export function totalVP(player: PlayerState) {
  return allCards(player)
    .filter(c => c.isType(CardType.Victory))
    .map(c => c.props.vp ?? 0)
    .reduce((sum, cur) => sum + cur, 0);
}
