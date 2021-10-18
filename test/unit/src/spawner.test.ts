import { mockGlobal } from 'screeps-jest';
import { RoleType } from 'global';
import { Spawner } from '../../../src/spawner';

describe("test body parts", () => {

    beforeEach(() => {
        mockGlobal<Game>('Game', {
            creeps: {},
            rooms: {},
            time: 1
        });
        mockGlobal<Memory>('Memory', {
            creeps: {}
        });

    });

    // builder has ratio 3:2:2
    const builderSize1 = [MOVE, WORK, CARRY];
    const builderSize2 = [MOVE, MOVE, WORK, CARRY];
    const builderSize3 = [MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY];

    it("should create some corret body part definitions", () => {
        let spawner = new Spawner({} as Room, {} as Memory);

        expect(spawner.getBodyPartsFor(RoleType.builder, -100)).toBeNull();
        expect(spawner.getBodyPartsFor(RoleType.builder, 0)).toBeNull();
        expect(spawner.getBodyPartsFor(RoleType.builder, 49)).toBeNull();
        expect(spawner.getBodyPartsFor(RoleType.builder, 50)).toBeNull();
        expect(spawner.getBodyPartsFor(RoleType.builder, 99)).toBeNull();
        expect(spawner.getBodyPartsFor(RoleType.builder, 100)).toBeNull();
        expect(spawner.getBodyPartsFor(RoleType.builder, 149)).toBeNull();
        expect(spawner.getBodyPartsFor(RoleType.builder, 150)).toBeNull();
        expect(spawner.getBodyPartsFor(RoleType.builder, 199)).toBeNull();
        expect(spawner.getBodyPartsFor(RoleType.builder, 200)).toEqual(builderSize1);
        expect(spawner.getBodyPartsFor(RoleType.builder, 249)).toEqual(builderSize1);
        expect(spawner.getBodyPartsFor(RoleType.builder, 250)).toEqual(builderSize2);
        expect(spawner.getBodyPartsFor(RoleType.builder, 299)).toEqual(builderSize2);
        expect(spawner.getBodyPartsFor(RoleType.builder, 300)).toEqual(builderSize2);
        expect(spawner.getBodyPartsFor(RoleType.builder, 349)).toEqual(builderSize2);
        expect(spawner.getBodyPartsFor(RoleType.builder, 350)).toEqual(builderSize2);
        expect(spawner.getBodyPartsFor(RoleType.builder, 399)).toEqual(builderSize2);
        expect(spawner.getBodyPartsFor(RoleType.builder, 400)).toEqual(builderSize2);
        expect(spawner.getBodyPartsFor(RoleType.builder, 449)).toEqual(builderSize2);
        expect(spawner.getBodyPartsFor(RoleType.builder, 450)).toEqual(builderSize3);
        expect(spawner.getBodyPartsFor(RoleType.builder, 499)).toEqual(builderSize3);
        expect(spawner.getBodyPartsFor(RoleType.builder, 500)).toEqual(builderSize3);
        expect(spawner.getBodyPartsFor(RoleType.builder, 549)).toEqual(builderSize3);
        expect(spawner.getBodyPartsFor(RoleType.builder, 550)).toEqual(builderSize3);
        expect(spawner.getBodyPartsFor(RoleType.builder, 599)).toEqual(builderSize3);
        expect(spawner.getBodyPartsFor(RoleType.builder, 600)).toEqual(builderSize3);
    });
});
