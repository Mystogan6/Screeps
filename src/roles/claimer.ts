export class ClaimerController {


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
            this.claim(creep)
        }

    }

    spawn(body: any, spawn: any) {
        var newName = 'Claimer' + Game.time;
        console.log('Spawning new claimer: ' + newName + ' For spawn: ' + spawn);
        const currentRoom = spawn === 'Spawn1' ? 'E26S49' : 'E26S48';
        Game.spawns[spawn].spawnCreep([WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE], newName,
            { memory: { role: 'claimer', room: currentRoom } });
    }

    claim(creep: Creep) {
        if (creep.pos.x !== 10 || creep.pos.y !== 35) {
            creep.moveTo(10, 35);
        } else {
            console.log("I have claimed, switching to building")
            creep.memory.role = "builder";
        }
    }

}
