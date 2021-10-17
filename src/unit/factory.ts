/// Factory that returns the correct role from the given

import { Global } from "global";
import { Builder } from "unit/builder";
import { Harvester } from "unit/harvester";
import { Upgrader } from "unit/upgrader";
import { BaseUnit } from "./baseUnit";

/// creep.
export class Factory {

    /// Return the given unit depending on the creeps memory
    public static getUnitFrom(creep: Creep): BaseUnit {
        switch (creep.memory.role) {
            case Global.Roles.harvester:
                return new Harvester(creep);
            case Global.Roles.builder:
                return new Builder(creep);
            case Global.Roles.upgrader:
                return new Upgrader(creep);
        }
        throw Error(`Unknown creep type found: "${creep.memory.role}"`);
    }
}
