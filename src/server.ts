import express from 'express';
import { SimFunction, sim } from './engine';
import { BigMoney, Chapel, ChapelLab, SmithyBigMoney, VillageSmithy } from './strategy';

const app = express();

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

app.get('/', (req, res) => {
  const sims: [string, SimFunction][] = [
    ['bigMoney', BigMoney],
    ['smithyBM', SmithyBigMoney],
    ['villageSmithy', VillageSmithy],
    ['chapel', Chapel],
    ['chapelLab', ChapelLab],
  ];
  const data = timerWrap(() => sims.reduce((obj, tuple) => {
    const [key, cb] = tuple;
    obj[key] = sim(1000, false, cb);
    return obj;
  }, {} as Record<string, number>));
  res.send(data);
});

app.listen(3000, () => {
  console.log('Server started');
});
