export class HelperFunctions {
    public static garbageCollection(): void {
        var counter = 0;
        for (var n in Memory.creeps) {
            var c = Game.creeps[n];
            if (!c) {
                delete Memory.creeps[n];
                counter++;
            }
        }
    }

    public static extend(target: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }, source: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }): void {
        for (var n in source) {
            if (!source.hasOwnProperty(n)) {
                continue;
            }
            if (target.hasOwnProperty(n)) {
                continue;
            }

            target[n] = source[n];
        }
    }
}
