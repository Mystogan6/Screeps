export class TowerController {

    constructor() {

    }

    defend(room: any) {
        const hostiles = Game.rooms[room].find(FIND_HOSTILE_CREEPS);
        if (hostiles.length) {
            const towers: any[] = Game.rooms[room].find(
                FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
            towers.forEach((tower: any) => tower.attack(hostiles[0]));
        }
    }

}
