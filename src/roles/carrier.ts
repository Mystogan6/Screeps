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
                    filter: (structure: any) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_TOWER || structure.structureType == STRUCTURE_STORAGE) &&
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

    runTransition(creep: Creep): void {
        if (creep.store.getFreeCapacity() > 0) {
            var source: any = Game.getObjectById(creep.memory.source)
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE && structure.store.getFreeCapacity() > 0);
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
                    creep.moveTo(5, 20, { visualizePathStyle: { stroke: '#0000ff' } });
                }

            }
        }
    }

    spawn(body: any, spawn: any, transition?: boolean) {
        var newName = 'Carrier' + Game.time;
        var sources = Game.rooms['E26S49'].find(FIND_SOURCES);
        let randomSource;
        console.log('Spawning new carrier: ' + newName + ' For spawn: ' + spawn);
        const currentRoom = spawn === 'Spawn1' ? 'E26S49' : 'E26S48';
        if (transition) {
            randomSource = sources[1];
            Game.spawns[spawn].spawnCreep(body, newName,
                { memory: { role: 'carrierTransition', source: randomSource.id, room: currentRoom } });
        } else {
            randomSource = sources[0];
            Game.spawns[spawn].spawnCreep(body, newName,
                { memory: { role: 'carrier', source: randomSource.id, room: currentRoom } });
        }
    }

}
