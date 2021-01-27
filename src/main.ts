import { SpawnHandler } from './memory/spawn.handler';
import { Builder } from './roles/builder';
import { Upgrader } from './roles/upgrader';
import { Harvester } from './roles/harvester';
import { ErrorMapper } from "utils/ErrorMapper";

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
    var creep = Game.creeps[name];
    if(creep.memory.role == 'harvester') {
      Harvester.run(creep);
    }
    if(creep.memory.role == 'upgrader') {
        Upgrader.run(creep);
    }
    if(creep.memory.role == 'builder') {
        Builder.run(creep);
    }
  }

  SpawnHandler.controlAndSpawn();

});
