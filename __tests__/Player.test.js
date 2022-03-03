const Player = require('../lib/Player');
const Potion = require('../lib/Potion');

jest.mock('../lib/Potion');

//console.log(new Potion());

test ('creates a player object', () => {
    const player = new Player('Kaitlyn');

    expect(player.name).toBe('Kaitlyn');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));

    expect(player.inventory).toEqual(expect.arrayContaining([expect.any(Object)]));
});

test("gets player's health value", () => {
    const player = new Player('Kaitlyn');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

// The getStats() method will return an object containing a subset of the player's properties. 
// The getInventory() method will return an array of Potion objects or return false if the inventory is empty.
test("get player's stats as an object", () => {
    const player = new Player('Kaitlyn');

    // checking that player.getStats() returns an object with four specific properties.
    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

// updating the value of our Player health halfway through the test so that we can check for both conditions: true and false.
test('checks if player is alive or not', () => {
    const player = new Player('Kaitlyn');

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

test('gets inventory from player or returns false', () => {
    const player = new Player('Kaitlyn');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

test('adds a potion to the inventory', () => {
    const player = new Player('Kaitlyn');
    const oldCount = player.inventory.length;

    player.addPotion(new Potion());

    expect(player.inventory.length).toBeGreaterThan(oldCount);
});

test('uses a potion from inventory', () => {
    const player = new Player('Kaitlyn');
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;

    player.usePotion(1);

    expect(player.inventory.length).toBeLessThan(oldCount);
});

test("gets player's attack value", () => {
    const player = new Player('Kaitlyn');
    player.strength = 10;

    expect(player.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(player.getAttackValue()).toBeLessThanOrEqual(15);
});

test("subtracts from player's health", () => {
    const player = new Player('Kaitlyn');
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(99999);

    expect(player.health).toBe(0);
});