import { Global, RoleType } from "global";
import { BaseUnit } from "./baseUnit";

export class Harvester extends BaseUnit {

    constructor(creep: Creep) {
        super(creep, RoleType.harvester);
    }

    public process() {
        this.execute(
            '⚡️ return',
            () => {
                const targets = this.creep.room.find(
                    FIND_STRUCTURES,
                    {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER)
                                && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                        }
                    }
                );

                if (targets.length > 0) {
                    const target = targets[0];
                    if (this.creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        this.creep.moveTo(target, Global.Types.harvester.pathVisual);
                    }
                    return true;
                }
                return false;
            });
    }
}
