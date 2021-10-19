import { RoleType } from "global";
import { idle } from "./strategy/idle";

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

    /// If the creep is working and runs out of energy
    /// it will start harvesting and the work callback will
    /// not be invoked.
    /// If the creep can execute the work, the callback will
    /// be invoked.
    /// The named parameter is used for the creep to say when he
    /// actually starts the work.
    /// Work should return true if the creep is actually doing something
    /// otherwise it will move towards the specified idle flag
    public execute(named: string, work: () => boolean) {
        // check if the creep is working and runs out of energy
        if (this.creep.memory.working === true && this.hasNoEnergy()) {
            this.creep.memory.working = false;
            this.creep.say('⛏ harvest');
        }
        /// check if the creep is harvesting and reached full energy
        if (this.creep.memory.working === false && this.hasFullEnergy()) {
            this.creep.memory.working = true;
            this.creep.say(named);
        }
        /// execute the right action
        if (this.creep.memory.working === false) {
            const sources = this.creep.room.find(FIND_SOURCES);
            if (sources.length > 0) {
                const source = sources[0];
                if (this.creep.harvest(source) === ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
                }
            }
        } else {
            if (!work()) {
                idle(this);
            }
        }
    }
}
