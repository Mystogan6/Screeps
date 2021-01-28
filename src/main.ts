import { WorkController } from './controllers/work.controller';
import { ErrorMapper } from "utils/ErrorMapper";
import { PopulationController } from './controllers/population.controller';
import { HelperFunctions } from './utils/HelperFunctions';

const TARGET_POPULATION = {
    harvester: 2,
    builder: 0,
    upgrader: 1,
    maintainer: 0,
    defender: 0
}

const populationController = new PopulationController(TARGET_POPULATION);
const workController = new WorkController();

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  HelperFunctions.garbageCollection();

  populationController.controlPopulation();

  workController.run()

});
