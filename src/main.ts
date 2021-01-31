import { TowerController } from './controllers/towerController';
import { WorkController } from './controllers/work.controller';
import { ErrorMapper } from "utils/ErrorMapper";
import { PopulationController } from './controllers/population.controller';
import { HelperFunctions } from './utils/HelperFunctions';

const TARGET_POPULATION = {
  harvester: 2,
  builder: 1,
  upgrader: 2,
  maintainer: 1,
  defender: 1,
  attacker: 0,
  carrier: 3
}

const populationController = new PopulationController(TARGET_POPULATION);
const workController = new WorkController();
const towerController = new TowerController();

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  HelperFunctions.garbageCollection();

  populationController.controlPopulation();

  workController.run()

  towerController.defend();

});
