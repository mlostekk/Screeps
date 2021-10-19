import { Global, RoleType } from "global";

/// Class that takes care of spawning the currently
/// needed units
export class Spawner {

    /// The room the spawner works for
    room: Room;

    /// The memory the spawner works with
    memory: Memory;

    /// Construction with dependencies
    constructor(room: Room, memory: Memory) {
        this.room = room;
        this.memory = memory;
    }

    /// Generic trigger for the spawner
    public spawnCreeps(): boolean {

        // get the correct spawn
        const spawns = this.room.find(FIND_MY_SPAWNS);
        if (spawns.length == 0) {
            console.error(`No spawn found in room: ${this.room.name}`);
            return false;
        }
        // TODO: allow multiple spawns
        const spawn = spawns[0] as StructureSpawn;

        // TODO: read up RENEWING CREEPS instead of building new ones

        let harvesterSpawned = false;
        let builderSpawned = false;
        let upgraderSpawned = false;

        [RoleType.harvester,
        RoleType.builder,
        RoleType.upgrader].forEach((type) => {
            this.spawnType(type,
                Global.Amounts[type],
                this.room.energyAvailable,
                spawn);
        });
        // // spawn harvester first
        // harvesterSpawned = this.spawnHarvesterAt(spawn);

        // // builder
        // if (!harvesterSpawned) {
        //     builderSpawned = this.spawnBuilderAt(spawn);
        // }

        // if (!builderSpawned) {
        //     upgraderSpawned = this.spawnUpgraderAt(spawn);
        // }

        // show text
        if (spawn.spawning) {
            var spawningCreep = Game.creeps[spawn.spawning.name];
            spawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                spawn.pos.x + 1,
                spawn.pos.y,
                { align: 'left', opacity: 0.8 });
        }

        return harvesterSpawned
            || builderSpawned
            || upgraderSpawned;

    }

    /// Spawn the given type if required
    spawnType(type: RoleType, maxAmount: number, maxCost: number, spawn: StructureSpawn): boolean {
        // next index of the given type
        const index = this.memory.spawnIndex[type];
        // get current amount of the given type
        const amount = _.filter(
            Game.creeps,
            (creep) => creep.memory.role == type
        ).length;
        // check if we need more of them
        if (amount < maxAmount) {
            const name = `${type} ${index}`;
            const bodyParts = this.getBodyPartsFor(type, maxCost);
            if (bodyParts != null) {
                console.log(`Spawning new creep: ${name}`);
                spawn.spawnCreep(
                    bodyParts,
                    name,
                    { memory: { role: type } });
                this.memory.spawnIndex[type] = index + 1;
                return true;
            } else {
                console.log(`Not possible to spawn ${type} for ${maxCost} energy`);
            }
        }
        return false;
    }

    /// Get the body parts for a given type with a given limit
    /// Might return null if the energy limit does not allow a
    /// configuration
    getBodyPartsFor(type: RoleType, energyLimit: number): BodyPartConstant[] | null {
        let ratio = this.getRatioFor(type);
        let ratioMapped = _.map(ratio, (num) => num);
        let biggestRatio = Math.max.apply(null, ratioMapped);
        let index = 1;

        interface returnType {
            cost: number,
            parts: {
                move: number,
                work: number,
                carry: number,
            };
        }

        const calcluateForIndex = (index: number): returnType => {
            let parts = {
                move: ratio[MOVE] > 0 ? Math.max(1, Math.round(index * ratio[MOVE] / biggestRatio)) : 0,
                work: ratio[WORK] > 0 ? Math.max(1, Math.round(index * ratio[WORK] / biggestRatio)) : 0,
                carry: ratio[CARRY] > 0 ? Math.max(1, Math.round(index * ratio[CARRY] / biggestRatio)) : 0
            };
            let cost =
                parts.move * BODYPART_COST[MOVE] +
                parts.work * BODYPART_COST[WORK] +
                parts.carry * BODYPART_COST[CARRY];

            return {
                cost: cost,
                parts: parts,
            };
        };
        let current = calcluateForIndex(index);
        let next = calcluateForIndex(++index);
        if (current.cost > energyLimit) {
            return null;
        }
        while (next.cost <= energyLimit) {
            current = calcluateForIndex(index);
            next = calcluateForIndex(++index);
        }
        // generate bodypart list
        let bodyParts: BodyPartConstant[] = [];
        bodyParts = bodyParts.concat([...Array(current.parts.move)].map(() => MOVE));
        bodyParts = bodyParts.concat([...Array(current.parts.work)].map(() => WORK));
        bodyParts = bodyParts.concat([...Array(current.parts.carry)].map(() => CARRY));
        return bodyParts;
    };

    /// Get the body part ratio of a given role type
    getRatioFor(type: RoleType): { [BodyPartConstant: string]: number; } {
        // reset ratio
        const ratio: { [BodyPartConstant: string]: number; } = {};
        ratio[MOVE] = 0;
        ratio[WORK] = 0;
        ratio[CARRY] = 0;
        ratio[ATTACK] = 0;
        ratio[RANGED_ATTACK] = 0;
        ratio[TOUGH] = 0;
        ratio[HEAL] = 0;
        ratio[CLAIM] = 0;

        // get ratio depending on the type
        switch (type) {
            case RoleType.harvester:
            case RoleType.builder:
            case RoleType.upgrader:
                ratio[MOVE] = 2;
                ratio[CARRY] = 3;
                ratio[WORK] = 3;
                break;
        }
        return ratio;
    }
}
