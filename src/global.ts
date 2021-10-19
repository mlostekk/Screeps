export enum RoleType {
    harvester = "harvester",
    builder = "builder",
    upgrader = "upgrader"
}

export const Global = {
    Amounts: {
        harvester: 2,
        builder: 1,
        upgrader: 2
    },
    Flags: {
        rendezvousHarvester: "RendezvousHarvester",
        rendezvousBuilder: "RendezvousBuilder"
    }
};
