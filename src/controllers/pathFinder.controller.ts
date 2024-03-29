export class PathFinderController {

    constructor() {

    }

    findPath(creep: Creep, goals: any) {
        return PathFinder.search(
            creep.pos, goals,
            {
                // We need to set the defaults costs higher so that we
                plainCost: 2,
                swampCost: 10,

                roomCallback: function (): any {

                    let room = creep.room;
                    // In this example `room` will always exist, but since
                    // PathFinder supports searches which span multiple rooms
                    // to handle in next room controller iteration
                    if (!room) return;
                    let costs = new PathFinder.CostMatrix;

                    room.find(FIND_STRUCTURES).forEach(function (struct) {
                        if (struct.structureType === STRUCTURE_ROAD) {
                            // Favor roads over plain tiles
                            costs.set(struct.pos.x, struct.pos.y, 1);
                        } else if (struct.structureType !== STRUCTURE_CONTAINER &&
                            (struct.structureType !== STRUCTURE_RAMPART ||
                                !struct.my)) {
                            // Can't walk through non-walkable buildings
                            costs.set(struct.pos.x, struct.pos.y, 0xff);
                        }
                    });

                    // Avoid creeps in the room
                    room.find(FIND_CREEPS).forEach(function (creep) {
                        costs.set(creep.pos.x, creep.pos.y, 0xff);
                    });

                    return costs;
                },
            }
        );
    }
}
