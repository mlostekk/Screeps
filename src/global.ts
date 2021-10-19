export enum RoleType {
    harvester = "harvester",
    builder = "builder",
    upgrader = "upgrader",
    repairer = "repairer",
}

export const Global = {
    Amounts: {
        harvester: 2,
        upgrader: 2,
        builder: 1,
        repairer: 1
    },
    Types: {
        harvester: {
            pathVisual: { visualizePathStyle: { stroke: '#ff0000' } },
            rendezvous: "RendezvousHarvester"
        },
        builder: {
            pathVisual: { visualizePathStyle: { stroke: '#00ff00' } },
            rendezvous: "RendezvousBuilder"
        },
        repairer: {
            pathVisual: { visualizePathStyle: { stroke: '#00ffff' } },
            rendezvous: "RendezvousBuilder"
        },
        upgrader: {
            pathVisual: { visualizePathStyle: { stroke: '#0000ff' } },
            rendezvous: "RendezvousBuilder"
        }
    }
};
