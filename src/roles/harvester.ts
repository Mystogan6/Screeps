import { HelperFunctions } from './../utils/HelperFunctions';
export class HarvesterController {

    constructor() {
    }

    /** @param {Creep} creep **/
    run(creep: Creep): void {
        if (creep.store.getFreeCapacity() > 0) {
            const reserves = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_STORAGE && (structure.store.getUsedCapacity() > 0))
                        || structure.structureType == STRUCTURE_CONTAINER && (structure.store.getUsedCapacity() > 0)
                    );
                }
            });
            if (reserves) {
                if (creep.withdraw(reserves, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(reserves, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else {
                const source: any = creep.room.find(FIND_SOURCES);
                if (creep.harvest(source[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source[1], { visualizePathStyle: { stroke: '#ffaa00' } });
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
                creep.moveTo(14, 16, { visualizePathStyle: { stroke: '#0000ff' } });
            }

        }
    }

    spawn(body: any, spawn: any) {
        var newName = 'harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName + ' For spawn: ' + spawn);
        const currentRoom = spawn === 'Spawn1' ? 'E26S49' : 'E26S48';
        const harvestBod = spawn === 'Spawn1' ? [WORK, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE] : [WORK, CARRY, MOVE, MOVE, MOVE]
        Game.spawns[spawn].spawnCreep(harvestBod, newName,
            { memory: { role: 'harvester', room: currentRoom } });
    }

}
