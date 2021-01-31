# Screeps using typescript


## Jan, 28 - 2021

### V 1.0.0

- Full operating simple base. All basic roles are met :

    * Harvester : Collects energy, fills in extensions and spawn (if full, then maintain structures)
    * Upgraders : Collects energy, upgrade core
    * Defender : Goes to a fixed spot and attacks any hostile creep around
    * Builder : Collects energy, build constructions (if no construction, maintain structures)
    * Maintainer : Collects energy, maintain structures

### V 1.0.1

- Addition of body factory, allowing to spawn creeps in accordance with base capacity

### V 1.0.2

- Small refactoring of popullation controller and body factory to enhance performances and reduce loaded things each tick.

### V 1.1.0

- Ready for live server deployment


### V 1.2.0

- Starting on pathfinderController

## Jan, 29 - 2021

### V 1.3.0

- Adding attacker role

## Jan, 31 - 2021

### V 2.0.0

- Adding carrier role
    * Creep in charge of harvesting all the time and transfer ressources to reserve
- Changing all creeps behavior so they don't harvest sources, but only take energy from reserves
