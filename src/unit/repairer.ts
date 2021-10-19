import { Global, RoleType } from "global";
import { BaseUnit } from "./baseUnit";

export class Repairer extends BaseUnit {

    constructor(creep: Creep) {
        super(creep, RoleType.repairer);
    }

    /// Main process function for the repairer
    public process() {
        this.execute(
            '🛠 repair',
            () => {
                const targets = this.creep.room
                    .find(FIND_STRUCTURES, { filter: structure => structure.hits < structure.hitsMax })
                    .sort((one, other) => one.hits - other.hits);
                if (targets.length > 0) {
                    const target = targets[0];
                    if (this.creep.repair(target) == ERR_NOT_IN_RANGE) {
                        this.creep.moveTo(target, Global.Types.repairer.pathVisual);
                    }
                    return true;
                }
                return false;
            });
    }

}
