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
    const player = new Player('Jessica');

    expect(player.getInventory()).toEqual(expect.any(Array));

    player.inventory = [];

    expect(player.getInventory()).toEqual(false);
});