export class BodyFactory {

    private level: any;

    constructor(level: any) {
        this.level = level;
    }

    generateBodyParts(role: any): any {
        let result: any;
        switch (role) {
            case 'harvester':
            case 'builder':
            case 'upgrader':
            case 'maintainer':
            default:
                result = this.generateWorkerBody();
            case 'defender':
                result = this.generateMillitaryBody();
        }
        return result;
    }

    private generateWorkerBody() {
        switch(this.level) {
            case 1:
            default:
                return [WORK, CARRY, MOVE];
            case 2:
                return [WORK, WORK, CARRY, MOVE];
            case 3:
                return [WORK, WORK, CARRY, CARRY, MOVE];
            case 4:
                return [WORK, WORK, WORK, CARRY, CARRY, MOVE];
            case 5:
                return [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE];
            case 6:
                return [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE];
            case 7:
                return [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE];
        }
    }

    private generateMillitaryBody() {
        switch(this.level) {
            case 1:
            default:
                return [TOUGH, ATTACK, MOVE];
            case 2:
                return [TOUGH, TOUGH, ATTACK, MOVE];
            case 3:
                return [TOUGH, TOUGH, ATTACK, ATTACK, MOVE];
            case 4:
                return [TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, MOVE];
            case 5:
                return [TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, MOVE];
            case 6:
                return [TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE];
            case 7:
                return [TOUGH, TOUGH, TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE];
        }
    }

}
