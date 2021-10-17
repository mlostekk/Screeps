export enum RoleType {
    harvester = "harvester",
    builder = "builder",
    upgrader = "upgrader"
}

export const Global = {
    Amounts: {
        harvester: 2,
        builder: 2,
        upgrader: 1
    },
    Flags: {
        rendezvousHarvester: "RendezvousHarvester",
        rendezvousBuilder: "RendezvousBuilder"
    }
};
