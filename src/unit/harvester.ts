import { Global, RoleType } from "global";
import { BaseUnit } from "./baseUnit";
import { idle } from "./strategy/idle";

export class Harvester extends BaseUnit {

    constructor(creep: Creep) {
        super(creep, RoleType.harvester);
    }

    public process() {
        if (this.hasCapacityLeft()) {
            var sources = this.creep.room.find(FIND_SOURCES);
            if (this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            var targets = this.creep.room.find(
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
                if (this.creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            } else {
                // move to idle rendezvous
                idle(this);
            }
        }
    }
}
