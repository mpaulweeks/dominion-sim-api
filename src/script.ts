import { sim } from "./engine";
import { SampleStrategies } from "./strategy/sample";

function main() {
  console.log(process.argv);
  const strategyId = process.argv[2];
  const strategy = SampleStrategies.filter(s => s.label === strategyId)[0];
  if (!strategy) {
    return console.log('strategy not found:', strategyId);
  }
  console.log(sim(1, true, strategy.cb));
}
main();
