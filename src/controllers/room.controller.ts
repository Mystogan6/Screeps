import { PopulationController } from './population.controller';
export class RoomController {

    private _rooms: any;
    private _popController: PopulationController;

    constructor(rooms: any, popController: PopulationController) {
        this._rooms = rooms;
        this._popController = popController;
    }

    public run(): void {
        this._rooms.forEach((room: any) => {
            this.handleSpawn(room);
        });
    }

    private handleSpawn(room: any) {
        this._popController.controlPopulation(room.targetPop, room.level, room.spawn, room.name);
    }



}
