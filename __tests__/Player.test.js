const Potion = require('../lib/Potion');

jest.mock('../lib/Potion');

console.log(new Potion());

const Player = require('../lib/Player');

test ('creates a player object', () => {
    const player = new Player('Kaitlyn');

    expect(player.name).toBe('Kaitlyn');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
    );
});

// The getStats() method will return an object containing a subset of the player's properties. 
// The getInventory() method will return an array of Potion objects or return false if the inventory is empty.
test("get player's stats as an object", () => {
    const player = new Player('Jessica');

    // checking that player.getStats() returns an object with four specific properties.
    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
});

test('gets inventory from player or returns false', () => {
    const player = new Player('Laur');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});

test("gets player's health value", () => {
    const player = new Player('Karen');

    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
});

// updating the value of our Player health halfway through the test so that we can check for both conditions: true and false.
test('checks if player is alive or not', () => {
    const player = new Player('Bob');

    expect(player.isAlive()).toBeTruthy();

    player.health = 0;

    expect(player.isAlive()).toBeFalsy();
});

test("subtracts from player's health", () => {
    const player = new Player('Jessika');
    const oldHealth = player.health;

    player.reduceHealth(5);

    expect(player.health).toBe(oldHealth - 5);

    player.reduceHealth(99999);

    expect(player.health).toBe(0);
});