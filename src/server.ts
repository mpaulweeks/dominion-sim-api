import express from 'express';
import { sim } from './engine';
import { BigMoney, SmithyBigMoney, VillageSmithy } from './strategy';

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
  const data = timerWrap(() => ({
    bigMoney: sim(1000, false, BigMoney),
    smithyBM: sim(1000, false, SmithyBigMoney),
    villageSmithy: sim(1000, false, VillageSmithy),
  }));
  res.send(data);
});

app.listen(3000, () => {
  console.log('Server started');
});
