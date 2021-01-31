import { HelperFunctions } from './../utils/HelperFunctions';
export class HarvesterController {

    constructor() {
    }

    /** @param {Creep} creep **/
    run(creep: Creep): void {
        if (creep.store.getFreeCapacity() > 0) {
            const reserves = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && (structure.store.getUsedCapacity() > 0));
                }
            });
            if (reserves) {
                if (creep.withdraw(reserves, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(reserves, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        }
        else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                creep.moveTo(33, 13, { visualizePathStyle: { stroke: '#0000ff' } });
            }

        }
    }

    spawn(body: any) {
        var newName = 'harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
            { memory: { role: 'harvester' } });
    }

}
