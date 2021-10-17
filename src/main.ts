import { ErrorMapper } from "utils/ErrorMapper";
import { RoomRunner } from "./roomRunner";

declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */
  // Memory extension samples
  interface Memory {
    spawnIndex: {
      harvester: number;
      builder: number;
      upgrader: number;
    };
    uuid: number;
    log: any;
  }

  interface CreepMemory {
    room?: string;
    working?: boolean;
    building?: boolean;
    role: string;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  // SANITY CHECKS
  // TODO: extract those
  if (Memory.spawnIndex == undefined) {
    Memory.spawnIndex = {
      harvester: 0,
      builder: 0,
      upgrader: 0
    };
  }

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  // Run all rooms
  for (const roomName in Game.rooms) {
    const room = Game.rooms[roomName] as Room;
    const roomRunner = new RoomRunner(room, Memory);
    roomRunner.run();
  }
});
