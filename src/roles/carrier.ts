import { HelperFunctions } from "utils/HelperFunctions";

export class CarrierController {

    constructor() {
    }

    /** @param {Creep} creep **/
    run(creep: Creep): void {
        if (creep.store.getFreeCapacity() > 0) {
            var source: any = Game.getObjectById(creep.memory.source)
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && structure.store.getFreeCapacity() > 0);
                }
            });
            if (targets.length) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ff00dd' } });
                }
            } else {
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
    }

    spawn(body: any) {
        var newName = 'Carrier' + Game.time;
        console.log('Spawning new carrier: ' + newName);
        var sources = Game.rooms['E26S49'].find(FIND_SOURCES);
        const randomSource = sources[HelperFunctions.randomNumber(sources.length)];
        Game.spawns['Spawn1'].spawnCreep(body, newName,
            { memory: { role: 'carrier', source: randomSource.id} });
    }

}
