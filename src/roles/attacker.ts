import { HelperFunctions } from './../utils/HelperFunctions';
export class AttackerController {


    constructor() { }
    /** @param {Creep} creep **/
    run(creep: Creep): void {
        if (creep.room.name != 'E26S48') {
            console.log("Not in the right room")
            const exitDir: any = Game.map.findExit(creep.room, 'E26S48');
            const exit: any = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit, { visualizePathStyle: { stroke: '#0000ff' } });
            console.log("going to closest exit: ", JSON.stringify(exit))
        } else {
            this.attack(creep)
        }

    }

    spawn(body: any, spawn: any) {
        var newName = 'Attacker' + Game.time;
        console.log('Spawning new attacker: ' + newName);
        const currentRoom = spawn === 'Spawn1' ? 'E26S49' : 'E26S48';
        Game.spawns[spawn].spawnCreep(body, newName,
            { memory: { role: 'attacker', room: currentRoom } });
    }

    attack(creep: Creep) {
        const target = this.findTarget(creep);
        if (target) {
            if (creep.attack(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ff0000' } })
            }
        } else {
            creep.moveTo(20, 24, { visualizePathStyle: { stroke: '#ffffff' } })
        }
    }

    private findTarget(creep: Creep) {

        // First, kill creep that can attack
        let target: any = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function (object) {
                return object.getActiveBodyparts(ATTACK) >= 0;
            }
        });
        if (target) {
            return target;
        } else {
            // Then kill towers
            target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES, {
                filter: function (object) {
                    return object.structureType === STRUCTURE_TOWER;
                }
            });
            if (target) {
                return target;
            } else {
                // Then kill spawns
                    return target = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);
            }
        }
    }
}
