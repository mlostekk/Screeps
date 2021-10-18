import { RoleType } from "global";
import { BaseUnit } from "./baseUnit";
import { idle } from "./strategy/idle";

export class Builder extends BaseUnit {

    constructor(creep: Creep) {
        super(creep, RoleType.builder);
    }

    public process() {
        if (this.creep.memory.building == true && this.hasNoEnergy()) {
            this.creep.memory.building = false;
            this.creep.say('🔄 harvest');
        }

        if (this.creep.memory.building == false && this.hasFullEnergy()) {
            this.creep.memory.building = true;
            this.creep.say('🚧 build');
        }

        if (this.creep.memory.building) {
            if (!(
                this.build() ||
                this.repair()
            )) {
                idle(this)
            }
        }
        else {
            var sources = this.creep.room.find(FIND_SOURCES);
            if (this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }

    build(): boolean {
        var targets = this.creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            const target = targets[0];
            if (this.creep.build(target) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return true;
        }
        return false;
    }

    repair(): boolean {
        const targets = this.creep.room
            .find(FIND_STRUCTURES, { filter: structure => structure.hits < structure.hitsMax })
            .sort((one, other) => one.hits - other.hits);
        if (targets.length > 0) {
            const target = targets[0];
            if (this.creep.repair(target) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return true;
        }
        return false;
    }
}
