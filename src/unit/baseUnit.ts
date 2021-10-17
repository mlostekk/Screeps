import { RoleType } from "global";

export class BaseUnit {
    creep: Creep;
    type: RoleType;

    constructor(creep: Creep, roleType: RoleType) {
        this.creep = creep;
        this.type = roleType;
    }

    public process() {
        throw Error("Shall never be called");
    }

    hasNoEnergy(): boolean {
        return this.creep.store.energy == 0;
    }

    hasFullEnergy(): boolean {
        return this.creep.store.getFreeCapacity() == 0;
    }

    hasCapacityLeft(): boolean {
        return this.creep.store.getFreeCapacity() > 0;
    }
}
