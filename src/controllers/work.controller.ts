import { UpgraderController } from './../roles/upgrader';
import { BuilderController } from './../roles/builder';
import { HarvesterController } from './../roles/harvester';
export class WorkController {
    private _creeps: any;

    harvesterController: HarvesterController;
    builderController: BuilderController;
    upgraderController: UpgraderController;

    constructor(creeps: any) {
        this._creeps = creeps;

        this.harvesterController = new HarvesterController();
        this.builderController = new BuilderController();
        this.upgraderController = new UpgraderController();
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
                default:
                    break;
            }
        }
    }
}
