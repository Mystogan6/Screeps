import { HelperFunctions } from './../utils/HelperFunctions';
export class DefenderController {

    constructor() { }
    /** @param {Creep} creep **/
    run(creep: Creep): void {
        if (!creep.memory.target) {
            var targets = creep.room.find(FIND_HOSTILE_CREEPS);
            if (targets.length) {
                creep.memory.target = targets[HelperFunctions.randomNumber(targets.length)];
            }
            creep.moveTo(16, 43, { visualizePathStyle: { stroke: '#ffffff' } })
        }
        if (creep.memory.target) {
            var username = creep.memory.target.owner.username;
            Game.notify(`User ${username} spotted in room`);
            creep.attack(creep.memory.target);
        }
    }

    spawn(body: any) {
        var newName = 'Defender' + Game.time;
        console.log('Spawning new defender: ' + newName);
        Game.spawns['Spawn1'].spawnCreep(body, newName,
            { memory: { role: 'defender' } });
    }
}
