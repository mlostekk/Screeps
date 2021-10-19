import { Global, RoleType } from "global";
import { BaseUnit } from "./baseUnit";

export class Builder extends BaseUnit {

    constructor(creep: Creep) {
        super(creep, RoleType.builder);
    }

    /// Main process function for the builder
    public process() {
        this.execute(
            '🚧 build',
            () => {
                const targets = this.creep.room.find(FIND_CONSTRUCTION_SITES);
                if (targets.length) {
                    const target = targets[0];
                    if (this.creep.build(target) == ERR_NOT_IN_RANGE) {
                        this.creep.moveTo(target, Global.Types.builder.pathVisual);
                    }
                    return true;
                }
                return false;
            });
    }

    repair(): boolean {
        const targets = this.creep.room
            .find(FIND_STRUCTURES, { filter: structure => structure.hits < structure.hitsMax })
            .sort((one, other) => one.hits - other.hits);
        if (targets.length > 0) {
            const target = targets[0];
            if (this.creep.repair(target) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(target, Global.Types.builder.pathVisual);
            }
            return true;
        }
        return false;
    }
}
