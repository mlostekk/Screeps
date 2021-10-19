export function initCreepPrototypes() {
    Creep.prototype.hasNoEnergy = function (): boolean {
        return this.store.energy == 0;
    };
};
