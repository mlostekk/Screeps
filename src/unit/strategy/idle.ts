import { Global } from "global";
import { BaseUnit } from "unit/baseUnit";

/// Trigger going into idle position, return true if
/// entity goes idle, false if its not possible
export function idle(entity: BaseUnit): boolean {
    // the flag name
    const rendezvousFlagName = Global.Types[entity.type].rendezvous;

    // find closest rendezvous flag
    const rendezvousFlag = entity.creep.pos
        .findClosestByPath(FIND_FLAGS,
            {
                filter: (flag: Flag) => flag.name == rendezvousFlagName
            });

    // try to move towards rendezvous flag
    if (rendezvousFlag != undefined) {
        entity.creep.say("💤");
        entity.creep.moveTo(rendezvousFlag);
        return true;
    }
    // no rendezvous flag found
    console.log(`No rendezvous "${rendezvousFlagName}" found in room: ${entity.creep.room}`);
    return false;
}
