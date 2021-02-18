import { RoomController } from './controllers/room.controller';
import { TowerController } from './controllers/towerController';
import { WorkController } from './controllers/work.controller';
import { ErrorMapper } from "utils/ErrorMapper";
import { PopulationController } from './controllers/population.controller';
import { HelperFunctions } from './utils/HelperFunctions';

const ROOMS = [{
  name: 'E26S49',
  level: 5,
  targetPop: {
    harvester: 2,
    builder: 1,
    upgrader: 3,
    maintainer: 1,
    defender: 2,
    attacker: 0,
    carrier: 2,
    carrierTransition: 2,
    claimer: 0
  },
  spawn: 'Spawn1'
},
{
  name: 'E26S48',
  level: 4,
  targetPop: {
    harvester: 2,
    builder: 0,
    upgrader: 3,
    maintainer: 1,
    defender: 0,
    attacker: 0,
    carrier: 3,
    carrierTransition: 3,
    claimer: 0
  },
  spawn: 'Spawn2'
}];

const populationController = new PopulationController();
const workController = new WorkController();
const towerController = new TowerController();
const roomController = new RoomController(ROOMS, populationController);

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  HelperFunctions.garbageCollection();

  roomController.run();

  workController.run();

  towerController.defend('E26S49');
  towerController.defend('E26S48');

});
