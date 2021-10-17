import { Global } from "global";

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

        // spawn harvester first
        harvesterSpawned = this.spawnHarvesterAt(spawn);

        // builder
        if (!harvesterSpawned) {
            builderSpawned = this.spawnBuilderAt(spawn);
        }

        if (!builderSpawned) {
            upgraderSpawned = this.spawnUpgraderAt(spawn);
        }

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

    private spawnHarvesterAt(spawn: StructureSpawn): boolean {
        // current harvester index
        let harvesterIndex = this.memory.spawnIndex.harvester++;
        const harvesters = _.filter(
            Game.creeps,
            (creep) => creep.memory.role == Global.Roles.harvester);
        console.log('Harvesters: ' + harvesters.length);

        if (harvesters.length < Global.Amounts.harvester) {
            var newName = 'Harvester ' + harvesterIndex;
            console.log('Spawning new harvester: ' + newName);
            spawn.spawnCreep(
                [WORK, CARRY, MOVE, MOVE],
                newName,
                { memory: { role: 'harvester' } });
            this.memory.spawnIndex.harvester = harvesterIndex;
            return true;
        }
        return false;
    }

    private spawnBuilderAt(spawn: StructureSpawn): boolean {
        // current builder index
        let builderIndex = this.memory.spawnIndex.builder++;
        const builders = _.filter(
            Game.creeps,
            (creep) => creep.memory.role == Global.Roles.builder);
        console.log('Builders: ' + builders.length);

        if (builders.length < Global.Amounts.builder) {
            var newName = 'Builder ' + builderIndex;
            console.log('Spawning new builder: ' + newName);
            spawn.spawnCreep(
                [WORK, CARRY, MOVE, MOVE],
                newName,
                { memory: { role: 'builder' } });
            this.memory.spawnIndex.builder = builderIndex;
            return true;
        }
        return false;
    }

    private spawnUpgraderAt(spawn: StructureSpawn): boolean {
        // current upgrader index
        let upgraderIndex = this.memory.spawnIndex.upgrader++;
        const upgraders = _.filter(
            Game.creeps,
            (creep) => creep.memory.role == Global.Roles.upgrader);
        console.log('Upgraders: ' + upgraders.length);

        if (upgraders.length < Global.Amounts.upgrader) {
            var newName = 'Upgrader ' + upgraderIndex;
            console.log('Spawning new upgrader: ' + newName);
            spawn.spawnCreep(
                [WORK, CARRY, MOVE, MOVE],
                newName,
                { memory: { role: 'upgrader' } });
            this.memory.spawnIndex.upgrader = upgraderIndex;
            return true;
        }
        return false;
    }
}
