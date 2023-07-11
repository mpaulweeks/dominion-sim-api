import express from 'express';
import { simBuy } from './engine';
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

app.get('/', (req, res) => {
  const data = timerWrap(() => SampleStrategies.reduce((obj, strat) => {
    const { label, shoppingList } = strat;
    obj[label] = simBuy(10000, false, shoppingList);
    return obj;
  }, {} as Record<string, number>));
  res.send(data);
});

app.listen(port, () => {
  console.log('Server started on', port);
});
