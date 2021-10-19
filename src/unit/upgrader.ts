import { Global, RoleType } from "global";
import { BaseUnit } from "unit/baseUnit";

export class Upgrader extends BaseUnit {

    constructor(creep: Creep) {
        super(creep, RoleType.upgrader);
    }

    public process() {
        this.execute(
            '⬆️ upgrade',
            () => {
                if (this.creep.room.controller != undefined) {
                    const controller: StructureController = this.creep.room.controller;
                    if (this.creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                        this.creep.moveTo(controller, Global.Types.upgrader.pathVisual);
                    }
                    return true;
                }
                else {
                    console.log(`No controller found in ${this.creep.room.name}`);
                }
                return false;
            });
    }
}
