import { RoleType } from "global";
import { BaseUnit } from "unit/baseUnit";

export class Upgrader extends BaseUnit {

    constructor(creep: Creep) {
        super(creep, RoleType.upgrader);
    }

    public process() {
        if (!this.hasFullEnergy()) {
            var sources = this.creep.room.find(FIND_SOURCES);
            if (this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            if (this.creep.room.controller != undefined) {
                const controller: StructureController = this.creep.room.controller;

                if (this.creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
}
