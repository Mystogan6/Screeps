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

    controlPopulation(targetPop: any, level: any): void {
        const spawnList = this.creepsToSpawn(targetPop);
        if (spawnList.length) {
            this.spawnCreeps(spawnList, level);
        }
    }

    private creepsToSpawn(targetPop: any) {
        const popToSpawn: any = [];
        for (const name in targetPop) {
            const creeps = _.filter(Game.creeps, (creep) => creep.memory.role == name);
            if (creeps.length < targetPop[name]) {
                const creepToSpawn = { role: name };
                popToSpawn.push(creepToSpawn)
            }
            if (creeps.length === 0 && name === 'harvester') {
                var newName = 'harvester' + Game.time;
                console.log('Spawning new EMERGENCY harvester: ' + newName);
                Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newName,
                    { memory: { role: 'harvester' } });
            }
        }
        return popToSpawn;
    }

    private spawnCreeps(creeps: Array<any>, level: any) {

        const bodyFactory = new BodyFactory(level);
        const workerBody = bodyFactory.generateBodyParts('worker');
        const defendBody = bodyFactory.generateBodyParts('defend');
        const attackBody = bodyFactory.generateBodyParts('attack');

        creeps.forEach(creep => {
            if (creep.role === 'harvester') {
                const harvesterController = new HarvesterController();
                harvesterController.spawn(workerBody);
            } if (creep.role === 'builder') {
                const builderController = new BuilderController();
                builderController.spawn(workerBody);
            } if (creep.role === 'upgrader') {
                const upgraderController = new UpgraderController();
                upgraderController.spawn(workerBody);
            } if (creep.role === 'maintainer') {
                const maintainerController = new MaintainerController();
                maintainerController.spawn(workerBody);
            } if (creep.role === 'defender') {
                const defenderController = new DefenderController();
                defenderController.spawn(defendBody);
            } if (creep.role === 'attacker') {
                const attackerController = new AttackerController();
                attackerController.spawn(attackBody);
            } if (creep.role === 'carrier') {
                const carrierController = new CarrierController();
                carrierController.spawn(workerBody);
            } if (creep.role === 'carrierTransition') {
                const carrierController = new CarrierController();
                carrierController.spawn(workerBody, true);
            }
        });
    }

}
