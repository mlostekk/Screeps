import { Harvester } from "unit/harvester";
import { Upgrader } from "unit/upgrader";
import { Builder } from "unit/builder";
import { Spawner } from "spawner";
import { Factory } from "unit/factory";
import { BaseUnit } from "unit/baseUnit";

export class RoomRunner {

    /// Dependenies
    room: Room;
    memory: Memory;
    spawner: Spawner;

    /// Construction with dependencies
    constructor(
        room: Room,
        memory: Memory) {
        this.room = room;
        this.memory = memory;
        this.spawner = new Spawner(room, memory);
    }
    public run(): void {
        // debug
        if (this.memory.debug.room.energy) {
            this.room.visual.text(
                `⚡️: ${this.room.energyAvailable} / ${this.room.energyCapacityAvailable}`,
                0,
                1,
                { align: 'left', opacity: 1 });
        }

        // swaning
        this.spawner.spawnCreeps();

        // tower actions
        var towers = this.room.find(
            FIND_STRUCTURES,
            {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_TOWER;
                }
            }
        );

        for (let towerName in towers) {
            if (towerName) {
                const tower: StructureTower = towers[towerName] as StructureTower;
                var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if (closestHostile) {
                    tower.attack(closestHostile);
                }
            }
        }
        // iterate through all creeps
        this.room
            .find(FIND_MY_CREEPS)
            .map((creep: Creep) => Factory.getUnitFrom(creep))
            .forEach((unit: BaseUnit) => unit.process());
        // _.each(
        //     room.find(FIND_MY_CREEPS),
        //     (creep: Creep) => {
        //         if (creep.memory.role == "harvester") {
        //             Harvester.run(creep)
        //         } else if (creep.memory.role == "upgrader") {
        //             Upgrader.run(creep)
        //         } else if (creep.memory.role == "builder") {
        //             Builder.run(creep)
        //         }
        //     });
    }
}
