/// Factory that returns the correct role from the given

import { Global, RoleType } from "global";
import { Builder } from "unit/builder";
import { Harvester } from "unit/harvester";
import { Upgrader } from "unit/upgrader";
import { BaseUnit } from "./baseUnit";
import { Repairer } from "./repairer";

/// creep.
export class Factory {

    /// Return the given unit depending on the creeps memory
    public static getUnitFrom(creep: Creep): BaseUnit {
        switch (creep.memory.role) {
            case RoleType.harvester:
                return new Harvester(creep);
            case RoleType.builder:
                return new Builder(creep);
            case RoleType.upgrader:
                return new Upgrader(creep);
            case RoleType.repairer:
                return new Repairer(creep);
        }
        throw Error(`Unknown creep type found: "${creep.memory.role}"`);
    }
}
