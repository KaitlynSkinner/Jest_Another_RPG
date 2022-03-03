const Enemy = require('../lib/Enemy.js');
const Potion = require('../lib/Potion.js');

jest.mock('../lib/Potion.js');

test('creates an enemy object', () => {
    const enemy = new Enemy('goblin', 'sword');

    expect(enemy.name).toBe('goblin');
    expect(enemy.weapon).toBe('sword');
    expect(enemy.health).toEqual(expect.any(Number));
    expect(enemy.strength).toEqual(expect.any(Number));
    expect(enemy.agility).toEqual(expect.any(Number));
    expect(enemy.potion).toEqual(expect.any(Object));
});

test("gets enemy's health value", () => {
    const enemy = new Enemy('wizard', 'wand');

    expect(enemy.getHealth()).toEqual(expect.stringContaining(enemy.health.toString()));
});

// updating the value of our Enemy health halfway through the test so that we can check for both conditions: true and false.
test('checks if enemy is alive or not', () => {
    const enemy = new Enemy('dragon', 'fire');

    expect(enemy.isAlive()).toBeTruthy();

    enemy.health = 0;

    expect(enemy.isAlive()).toBeFalsy();
});

test("gets enemy's attack value", () => {
    const enemy = new Enemy('mages', 'magic');
    enemy.strength = 10;

    expect(enemy.getAttackValue()).toBeGreaterThanOrEqual(5);
    expect(enemy.getAttackValue()).toBeLessThanOrEqual(15);
});

test("subtracts from enemy's health", () => {
    const enemy = new Enemy('orc', 'battleaxe');
    const oldHealth = enemy.health;

    enemy.reduceHealth(5);

    expect(enemy.health).toBe(oldHealth - 5);

    enemy.reduceHealth(99999);

    expect(enemy.health).toBe(0);
});

// check for the enemy's description, as shown in the following code:
test('gets a description of the enemy', () => {
    const enemy = new Enemy('', '');

    expect(enemy.getDescription()).toEqual(expect.stringContaining(''));
    expect(enemy.getDescription()).toEqual(expect.stringContaining(''));
});