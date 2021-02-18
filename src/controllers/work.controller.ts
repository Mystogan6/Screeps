import { ClaimerController } from './../roles/claimer';
import { AttackerController } from './../roles/attacker';
import { DefenderController } from './../roles/defender';
import { MaintainerController } from './../roles/maintainer';
import { UpgraderController } from './../roles/upgrader';
import { BuilderController } from './../roles/builder';
import { HarvesterController } from './../roles/harvester';
import { CarrierController } from 'roles/carrier';
export class WorkController {

    harvesterController: HarvesterController;
    builderController: BuilderController;
    upgraderController: UpgraderController;
    maintainerController: MaintainerController;
    defenderController: DefenderController;
    attackerController: AttackerController;
    carrrierController: CarrierController;
    claimerController: ClaimerController;

    constructor() {
        this.harvesterController = new HarvesterController();
        this.builderController = new BuilderController();
        this.upgraderController = new UpgraderController();
        this.maintainerController = new MaintainerController();
        this.defenderController = new DefenderController();
        this.attackerController = new AttackerController();
        this.carrrierController = new CarrierController();
        this.claimerController = new ClaimerController();
    }

    run() {
        for (const name in Memory.creeps) {
            var creep = Game.creeps[name];
            switch (creep.memory.role) {
                case 'carrier':
                    this.carrrierController.run(creep);
                    break;
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
                    break;
                case 'defender':
                    this.defenderController.run(creep);
                    break;
                case 'attacker':
                    this.attackerController.run(creep);
                    break;
                case 'carrierTransition':
                    this.carrrierController.runTransition(creep);
                    break;
                case 'claimer':
                    this.claimerController.run(creep);
                    break;
                default:
                    break;
            }
        }
    }
}
