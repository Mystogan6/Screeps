import { DefenderController } from './../roles/defender';
import { MaintainerController } from './../roles/maintainer';
import { UpgraderController } from './../roles/upgrader';
import { BuilderController } from './../roles/builder';
import { HarvesterController } from './../roles/harvester';
export class PopulationController {

    private _targetPopulation: any;
    harvesterController: HarvesterController;
    builderController: BuilderController;
    upgraderController: UpgraderController;
    maintainerController: MaintainerController;
    defenderController: DefenderController;

    constructor(targetPopulation: any) {
        this._targetPopulation = targetPopulation;
        this.harvesterController = new HarvesterController();
        this.builderController = new BuilderController();
        this.upgraderController = new UpgraderController();
        this.maintainerController = new MaintainerController();
        this.defenderController = new DefenderController();
    }

    roleTargetReached(role: string): boolean {
        const creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);

        return creeps.length >= this._targetPopulation[role];
    }

    spawnCreep(): void {
        if (!this.roleTargetReached('harvester')) this.harvesterController.spawn();
        if (!this.roleTargetReached('builder')) this.builderController.spawn();
        if (!this.roleTargetReached('upgrader')) this.upgraderController.spawn();
        if (!this.roleTargetReached('maintainer')) this.maintainerController.spawn();
        if (!this.roleTargetReached('defender')) this.defenderController.spawn();
    }

}
