export class BaseUnit {
    creep: Creep;

    constructor(creep: Creep) {
        this.creep = creep;
    }

    public process() {
        console.error("Shall never be called");
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
