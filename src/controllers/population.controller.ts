import { BodyFactory } from './../utils/BodyFactory';
import { DefenderController } from './../roles/defender';
import { MaintainerController } from './../roles/maintainer';
import { UpgraderController } from './../roles/upgrader';
import { BuilderController } from './../roles/builder';
import { HarvesterController } from './../roles/harvester';
export class PopulationController {

    private _targetPopulation: any;

    constructor(targetPopulation: any) {
        this._targetPopulation = targetPopulation;
    }

    roleTargetReached(role: string): boolean {
        const creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);

        return creeps.length >= this._targetPopulation[role];
    }

    controlPopulation(): void {
        const spawnList = this.creepsToSpawn();
        if (spawnList.length) {
            this.spawnCreeps(spawnList);
        }
    }

    private creepsToSpawn() {
        const popToSpawn: any = [];
        for (const name in this._targetPopulation) {
            const creeps = _.filter(Game.creeps, (creep) => creep.memory.role == name);
            if (creeps.length < this._targetPopulation[name]) {
                const creepToSpawn = { role: name };
                popToSpawn.push(creepToSpawn)
            }
        }
        return popToSpawn;
    }

    private spawnCreeps(creeps: Array<any>) {

        const bodyFactory = new BodyFactory(6);
        const workerBody = bodyFactory.generateBodyParts('worker');
        const defendBody = bodyFactory.generateBodyParts('defend')

        creeps.forEach(creep => {
            if(creep.role === 'harvester') {
                const harvesterController = new HarvesterController();
                harvesterController.spawn(workerBody);
            } if(creep.role === 'builder') {
                const builderController = new BuilderController();
                builderController.spawn(workerBody);
            } if(creep.role === 'upgrader') {
                const upgraderController = new UpgraderController();
                upgraderController.spawn(workerBody);
            } if(creep.role === 'maintainer') {
                const maintainerController = new MaintainerController();
                maintainerController.spawn(workerBody);
            } if(creep.role === 'defender') {
                const defenderController = new DefenderController();
                defenderController.spawn(defendBody);
            }
        });
    }

}
