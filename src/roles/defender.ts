import { HelperFunctions } from './../utils/HelperFunctions';
export class DefenderController {


    constructor() { }
    /** @param {Creep} creep **/
    run(creep: Creep): void {
        let targets = creep.room.find(FIND_HOSTILE_CREEPS);;
        if (targets.length) {
            console.log('I have a target', targets[0])
            var username = targets[0].owner.username;
            Game.notify(`User ${username} spotted in room`);
            if (creep.attack(targets[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ff0000' } })
            }
        } else {
            creep.moveTo(20, 15, { visualizePathStyle: { stroke: '#ffffff' } })
        }
    }

    spawn(body: any, spawn: any) {
        var newName = 'Defender' + Game.time;
        console.log('Spawning new defender: ' + newName + ' For spawn: ' + spawn);
        const currentRoom = spawn === 'Spawn1' ? 'E26S49' : 'E26S48';
        Game.spawns[spawn].spawnCreep(body, newName,
            { memory: { role: 'defender', room: currentRoom } });
    }
}
