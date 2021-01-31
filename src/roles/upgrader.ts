export class UpgraderController {

    constructor() { }

    /** @param {Creep} creep **/
    run(creep: Creep): void {

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller!) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller!, { visualizePathStyle: { stroke: '#ffffff' } });
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
            }
        }
    }

    spawn(body: any) {
        var newName = 'upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(body, newName,
            { memory: { role: 'upgrader' } });
    }
}
