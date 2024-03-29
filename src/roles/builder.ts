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
            const currentRoom = creep.room.name === 'E26S49' ? 'Spawn1' : 'Spawn2';
            const priorityRepair = Game.spawns[currentRoom];
            if (priorityRepair.hits != priorityRepair.hitsMax) {
                if (creep.repair(priorityRepair) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(priorityRepair, { visualizePathStyle: { stroke: '#00ff00' } });
                }
            } else {
                const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length) {
                    if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                    }
                } else {
                    const targets = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_RAMPART) || (structure.structureType == STRUCTURE_WALL && structure.hits !== structure.hitsMax) || (structure.structureType == STRUCTURE_CONTAINER);
                        }
                    });
                    if (targets.length) {
                        if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                        }
                    }
                }
            }
        }
        else {
            const reserves = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && (structure.store.getUsedCapacity() > 0));
                }
            });
            if (reserves) {
                if (creep.withdraw(reserves, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(reserves, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            } else {
                const source: any = creep.pos.findClosestByRange(FIND_SOURCES);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        }
    }

    spawn(body: any, spawn: any) {
        var newName = 'builder' + Game.time;
        console.log('Spawning new builder: ' + newName + ' For spawn: ' + spawn);
        const currentRoom = spawn === 'Spawn1' ? 'E26S49' : 'E26S48';
        Game.spawns[spawn].spawnCreep(body, newName,
            { memory: { role: 'builder', room: currentRoom } });
    }
}
