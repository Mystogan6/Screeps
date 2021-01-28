export class BodyFactory {

    private level: any;

    constructor(level: any) {
        this.level = 3;
    }

    generateBodyParts(role: any): any {
        let result: any;
        switch (role) {
            case 'worker':
               return result = this.generateWorkerBody();
            case 'defend':
               return result = this.generateMillitaryBody();
            default:
                return result = this.generateWorkerBody();
        }
    }

    private generateWorkerBody() {
        switch (this.level) {
            case 1:
            default:
                return [WORK, CARRY, MOVE];
            case 2:
                return [WORK, CARRY, MOVE, MOVE, MOVE];
            case 3:
                return [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE];
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
        switch (this.level) {
            case 1:
            default:
                return [TOUGH, ATTACK, MOVE];
            case 2:
                return [TOUGH, TOUGH, ATTACK, MOVE];
            case 3:
                return [TOUGH, ATTACK, ATTACK, ATTACK, MOVE, MOVE, MOVE];
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
