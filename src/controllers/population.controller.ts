import { BodyFactory } from './../utils/BodyFactory';
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
    bodyFactory: BodyFactory;

    constructor(targetPopulation: any) {
        this._targetPopulation = targetPopulation;
        this.harvesterController = new HarvesterController();
        this.builderController = new BuilderController();
        this.upgraderController = new UpgraderController();
        this.maintainerController = new MaintainerController();
        this.defenderController = new DefenderController();
        this.bodyFactory = new BodyFactory(targetPopulation.level);
    }

    roleTargetReached(role: string): boolean {
        const creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);

        return creeps.length >= this._targetPopulation[role];
    }

    spawnCreep(): void {
        if (!this.roleTargetReached('harvester')) {
            const body = this.bodyFactory.generateBodyParts('harvester')
            this.harvesterController.spawn(body);
        } if (!this.roleTargetReached('builder')) {
            const body = this.bodyFactory.generateBodyParts('builder')
            this.builderController.spawn(body);
        } if (!this.roleTargetReached('upgrader')) {
            const body = this.bodyFactory.generateBodyParts('upgrader')
            this.upgraderController.spawn(body);
        } if (!this.roleTargetReached('maintainer')) {
            const body = this.bodyFactory.generateBodyParts('maintainer')
            this.maintainerController.spawn(body);
        } if (!this.roleTargetReached('defender')) {
            const body = this.bodyFactory.generateBodyParts('defender')
            this.defenderController.spawn(body);
        }
    }

}
