import { ClaimerController } from './../roles/claimer';
import { AttackerController } from './../roles/attacker';
import { BodyFactory } from './../utils/BodyFactory';
import { DefenderController } from './../roles/defender';
import { MaintainerController } from './../roles/maintainer';
import { UpgraderController } from './../roles/upgrader';
import { BuilderController } from './../roles/builder';
import { HarvesterController } from './../roles/harvester';
import { CarrierController } from 'roles/carrier';
export class PopulationController {


    constructor() {
    }

    controlPopulation(targetPop: any, level: any, spawn: any, roomName: string): void {
        const spawnList = this.creepsToSpawn(targetPop, roomName);
        if (spawnList.length) {
            this.spawnCreeps(spawnList, level, spawn);
        }
    }

    private creepsToSpawn(targetPop: any, roomName: string) {
        const popToSpawn: any = [];
        for (const name in targetPop) {
            const creeps = _.filter(Game.creeps, (creep) => creep.memory.role == name && creep.memory.room == roomName);
            if (creeps.length < targetPop[name]) {
                const creepToSpawn = { role: name };
                popToSpawn.push(creepToSpawn)
            }
            /* if (creeps.length === 0 && name === 'harvester') {
                var newName = 'harvester' + Game.time;
                console.log('Spawning new EMERGENCY harvester: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'harvester' } });
            } */
        }
        return popToSpawn;
    }

    private spawnCreeps(creeps: Array<any>, level: any, spawn: any) {

        const bodyFactory = new BodyFactory(level);
        const workerBody = bodyFactory.generateBodyParts('worker');
        const defendBody = bodyFactory.generateBodyParts('defend');
        const attackBody = bodyFactory.generateBodyParts('attack');

        creeps.forEach(creep => {
            if (creep.role === 'harvester') {
                const harvesterController = new HarvesterController();
                harvesterController.spawn(workerBody, spawn);
            } if (creep.role === 'builder') {
                const builderController = new BuilderController();
                builderController.spawn(workerBody, spawn);
            } if (creep.role === 'upgrader') {
                const upgraderController = new UpgraderController();
                upgraderController.spawn(workerBody, spawn);
            } if (creep.role === 'maintainer') {
                const maintainerController = new MaintainerController();
                maintainerController.spawn(workerBody, spawn);
            } if (creep.role === 'defender') {
                const defenderController = new DefenderController();
                defenderController.spawn(defendBody, spawn);
            } if (creep.role === 'attacker') {
                const attackerController = new AttackerController();
                attackerController.spawn(attackBody, spawn);
            } if (creep.role === 'carrier') {
                const carrierController = new CarrierController();
                carrierController.spawn(workerBody, spawn);
            } if (creep.role === 'carrierTransition') {
                const carrierController = new CarrierController();
                carrierController.spawn(workerBody, spawn, true);
            } if (creep.role === 'claimer') {
                const claimerController = new ClaimerController();
                claimerController.spawn(workerBody, spawn);
            }
        });
    }

}
