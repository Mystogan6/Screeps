export class TowerController {

    constructor() {

    }

    defend() {
        const hostiles = Game.rooms['E26S49'].find(FIND_HOSTILE_CREEPS);
        if (hostiles.length > 0) {
            const username = hostiles[0].owner.username;
            Game.notify(`User ${username} spotted in room ${'E26S49'}`);
            const towers = Game.rooms['E26S49'].find(
                FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
            const typedTowers = JSON.stringify(towers);
            const toto: any = JSON.parse(typedTowers);
            toto.forEach((tower: any) => tower.attack(hostiles[0]));
        }
    }

}
