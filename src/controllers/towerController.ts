export class TowerController {

    constructor() {

    }

    defend() {
        const hostiles = Game.rooms['E26S49'].find(FIND_HOSTILE_CREEPS);
        if (hostiles.length) {
            const towers: any[] = Game.rooms['E26S49'].find(
                FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
            towers.forEach((tower: any) => tower.attack(hostiles[0]));
        }
    }

}
