import { RoleType } from "global";
import { BaseUnit } from "unit/baseUnit";

const rendezvousFlagNames: { [RoleType: string]: string; } = {};
rendezvousFlagNames[RoleType.harvester] = "harvester";
rendezvousFlagNames[RoleType.builder] = "builder";
rendezvousFlagNames[RoleType.upgrader] = "upgrader";

/// Trigger going into idle position, return true if
/// entity goes idle, false if its not possible
export function idle(entity: BaseUnit): boolean {

    // find closest rendezvous flag
    const rendezvousFlag = entity.creep.pos
        .findClosestByPath(FIND_FLAGS,
            {
                filter: (flag: Flag) => flag.name == rendezvousFlagNames[entity.type]
            });

    // try to move towards rendezvous flag
    if (rendezvousFlag != undefined) {
        entity.creep.say("💤");
        entity.creep.moveTo(rendezvousFlag);
        return true;
    }
    // no rendezvous flag found
    console.error(`No rendezvous for harversters found in room: ${entity.creep.room}`);
    return false;
}