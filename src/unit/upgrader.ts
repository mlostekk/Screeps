import { RoleType } from "global";
import { BaseUnit } from "unit/baseUnit";

export class Upgrader extends BaseUnit {

    constructor(creep: Creep) {
        super(creep, RoleType.upgrader);
    }

    public process() {

        // Switch to harvesting
        if (this.creep.memory.building == true && this.hasNoEnergy()) {
            this.creep.memory.building = false;
            this.creep.say('🔄 harvest');
        }

        // Switch to upgrading
        if (!this.creep.memory.building == true && this.hasFullEnergy()) {
            this.creep.memory.building = true;
            this.creep.say('🚧 upgrade');
        }

        /// Execute the right action
        if (this.creep.memory.building) {
            if (this.creep.room.controller != undefined) {
                const controller: StructureController = this.creep.room.controller;

                if (this.creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(controller, { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
            else {
                console.log(`No controller found in ${this.creep.room.name}`);
            }
        }
        else {
            var sources = this.creep.room.find(FIND_SOURCES);
            if (this.creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                this.creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
}
