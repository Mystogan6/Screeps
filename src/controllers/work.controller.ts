import { DefenderController } from './../roles/defender';
import { MaintainerController } from './../roles/maintainer';
import { UpgraderController } from './../roles/upgrader';
import { BuilderController } from './../roles/builder';
import { HarvesterController } from './../roles/harvester';
export class WorkController {

    harvesterController: HarvesterController;
    builderController: BuilderController;
    upgraderController: UpgraderController;
    maintainerController: MaintainerController;
    defenderController: DefenderController;

    constructor() {
        this.harvesterController = new HarvesterController();
        this.builderController = new BuilderController();
        this.upgraderController = new UpgraderController();
        this.maintainerController = new MaintainerController();
        this.defenderController = new DefenderController();
    }

    run() {
        for (const name in Memory.creeps) {
            var creep = Game.creeps[name];
            switch(creep.memory.role) {
                case 'harvester':
                    this.harvesterController.run(creep)
                    break;
                case 'builder':
                    this.builderController.run(creep)
                    break;
                case 'upgrader':
                    this.upgraderController.run(creep)
                    break;
                case 'maintainer':
                    this.maintainerController.run(creep);
                case 'defender':
                    this.defenderController.run(creep);
                default:
                    break;
            }
        }
    }
}
