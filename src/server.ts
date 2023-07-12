import express from 'express';
import { CardID, Infin, simBuy } from './engine';
import { SampleStrategies } from './strategy/sample';

function timerWrap<T>(cb: () => T): {
  elapsed: number;
  data: T;
} {
  const now = Date.now();
  const data = cb();
  return {
    elapsed: Date.now() - now,
    data,
  };
}

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  const data = timerWrap(() => SampleStrategies.reduce((obj, strat) => {
    const { label } = strat;
    obj[label] = simBuy(1000, false, strat);
    return obj;
  }, {} as Record<string, any>));
  res.send(data);
});

app.post('/sim', (req, res) => {
  const body: {
    label: string;
    shoppingList: [string, number][];
  }[] = req.body;
  const data = body.map(player => ({
    label: player.label,
    stats: simBuy(1000, false, {
      label: player.label,
      shoppingList: player.shoppingList.map(tuple => [
        tuple[0] as CardID,
        tuple[1] >= 0 ? tuple[1] : Infin,
      ]),
    }),
  }));
  res.send(data);
});

app.listen(port, () => {
  console.log('Server started on', port);
});
