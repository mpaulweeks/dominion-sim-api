import express from 'express';
import cors from 'cors';
import { Simulation, Strategy, simGames } from '../engine';
import { SampleStrategies } from '../strategy/sample';
import { Card } from '../cards';

export class WebServer {
  readonly app = express();
  readonly appStart = new Date();
  constructor() {
    const { app } = this;
    app.use(cors());
    app.use(express.json());
    this.setupRoutes();
  }

  listen(port: number | string) {
    const { app } = this;
    app.listen(port, () => {
      console.log(`Server started: http://localhost:${port}`);
    });
  }

  private setupRoutes() {
    const { app } = this;

    app.get('/', (req, res) => {
      res.redirect(302, req.baseUrl + '/health');
    });

    app.get('/health', (req, res) => {
      res.send({
        appStart: this.appStart.toISOString(),
      });
    });

    app.get('/cards', (req, res) => {
      const cards = Card.getAll();
      const sets = cards
        .groupBy(c => c.props.setName ?? 'unknown')
        .map(cards => ({
          index: cards[0].props.setIndex,
          name: cards[0].props.setName,
          cards: cards
            .sortBy(c => [c.props.types.join(','), c.props.cost, c.props.id].join('-'))
            .map(c => c.props.id),
        }))
        .sortBy(set => set.index)
        .map(set => {
          delete set.index;
          return set;
        });
      res.send(sets);
    });

    app.get('/sample', (req, res) => {
      const strategies =  SampleStrategies.slice(0, 3);
      const data: Simulation = simGames(1000, false, strategies);
      res.send(data);
    });

    app.post('/sim', (req, res) => {
      const strategies: Strategy[] = req.body;
      const data: Simulation = simGames(1000, false, strategies);
      res.send(data);
    });
  }

  private timerWrap<T>(cb: () => T): {
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
}
