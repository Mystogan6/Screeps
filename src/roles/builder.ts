export class BuilderController {

    constructor() { }
    /** @param {Creep} creep **/
    run(creep: Creep): void {

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                const targets = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_RAMPART) || (structure.structureType == STRUCTURE_TOWER &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);
                    }
                });
                if (targets.length) {
                    if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }

    spawn() {
        var newName = 'builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
            { memory: { role: 'builder' } });
    }
}
